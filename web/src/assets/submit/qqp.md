对于含义相同的语句输出结果为 `{'label': 'LABEL_1'}`

对于含义不同的语句输出结果为 `{'label': 'LABEL_0'}`

例如

```python
import transformers

model_path = "howey/roberta-large-qqp"

tokenizer = transformers.AutoTokenizer.from_pretrained(model_path)
model = transformers.AutoModelForSequenceClassification.from_pretrained(model_path)
classifier = transformers.pipeline("text-classification", model=model, tokenizer=tokenizer)

# not_duplicate label 0
s0 = "How is the life of a math student? Could you describe your own experiences?, Which level of prepration is enough for the exam jlpt5?"

# duplicate label 1
s1 = "How do I control my horny emotions?, How do you control your horniness?"

classifier([s0, s1])

```

```
[{'label': 'LABEL_0', 'score': 0.9999908208847046},
 {'label': 'LABEL_1', 'score': 0.9999483823776245}]
```

