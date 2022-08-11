from fastapi import FastAPI  
from fastapi.middleware.cors import CORSMiddleware 
import uvicorn 
from transformers import pipeline 
from youtube_transcript_api import YouTubeTranscriptApi 
from bs4 import BeautifulSoup
import requests

app = FastAPI() 

origins = [
    "http://localhost",
    "http://localhost:3000",
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

summarizer = pipeline("summarization")
generator = pipeline('text-generation', model = 'gpt2')

def text_generator(txt):
    try:
        text = generator(txt, max_length = 70, num_return_sequences=1) 
        print(text)
        return text[0]["generated_text"]
    except:
        return "Invalid Text"

def video_summarizer(url):
    try :
        video_id = url.split("=")[1]  
        transcript = YouTubeTranscriptApi.get_transcript(video_id) 
        result = "" 
        for i in transcript:
            result += i["text"] + " "
        
        num_iters = int(len(result)/1000) 
        summarized_text = [] 
        for i in range(0 , num_iters+1): 
            print("train " , i)
            start = 0 
            start = i * 1000 
            end = (i+1) * 1000 
            out = summarizer(result[start:end])
            out = out[0] 
            out = out["summary_text"] 
            summarized_text.append(out) 
        final_text = " ".join(summarized_text)
        return final_text
    except :
        return "Only en-(English) videos can be processed" 

def blog_summarizer(URL): 
    try : 
        r = requests.get(URL)
        soup = BeautifulSoup(r.text, 'html.parser')
        results = soup.find_all(['h1', 'p'])
        text = [result.text for result in results]
        ARTICLE = ' '.join(text)
        max_chunk = 500
        ARTICLE = ARTICLE.replace('.', '.<eos>')
        ARTICLE = ARTICLE.replace('?', '?<eos>')
        ARTICLE = ARTICLE.replace('!', '!<eos>')
        sentences = ARTICLE.split('<eos>')
        current_chunk = 0 
        chunks = []
        for sentence in sentences:
            if len(chunks) == current_chunk + 1: 
                if len(chunks[current_chunk]) + len(sentence.split(' ')) <= max_chunk:
                    chunks[current_chunk].extend(sentence.split(' '))
                else:
                    current_chunk += 1
                    chunks.append(sentence.split(' '))
            else:
                print(current_chunk)
                chunks.append(sentence.split(' '))

        for chunk_id in range(len(chunks)):
            chunks[chunk_id] = ' '.join(chunks[chunk_id]) 

        res = summarizer(chunks, max_length=150, min_length=30, do_sample=False)
        final_text = ' '.join([summ['summary_text'] for summ in res])
        return final_text
    except:
        return "Invalid Blog Url"
        
@app.get("/")
async def root():
    return {"message": "Hello World Summarize"} 


@app.post("/test")
async def test(url: str ):
    return {"message": "Hello World Summarize" + url} 

@app.post("/generate")
async def generate(txt: str ):
    generate = text_generator(txt)
    return {"text": generate}

@app.post("/predict")
async def predict( 
    url: str
): 
    print("url" , url)
    if url.__contains__("youtube"):
        print("youtube")
        summary = video_summarizer(url) 
    else:
        print("blog")
        summary = blog_summarizer(url)
    return { 
        "summarized_text": summary
    }



if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)
