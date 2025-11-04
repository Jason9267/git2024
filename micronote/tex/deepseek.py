from openai import OpenAI

client = OpenAI(
    api_key="sk-7be79b4a96144800a80db130599d01f2",
    base_url="https://api.deepseek.com/v1"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "你好，写一个很简单的网页登录页面"}]
)

print(response.choices[0].message.content)