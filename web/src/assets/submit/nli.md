对于推理正确的语句输出结果为 `{'label': 'entailment'}`

对于前后无关的语句输出结果为 `{'label': 'neutral'}`

对于推理有误的语句输出结果为 `{'label': 'contradiction'}`

例如

```python
import transformers

model_path = "cross-encoder/nli-distilroberta-base"

tokenizer = transformers.AutoTokenizer.from_pretrained(model_path)
model = transformers.AutoModelForSequenceClassification.from_pretrained(model_path)
classifier = transformers.pipeline("text-classification", model=model, tokenizer=tokenizer)

# entailment label 0
s0 = "An old man with a package poses in front of an advertisement. A man poses in front of an ad."

# neutral label 1
s1 = "An old man with a package poses in front of an advertisement. A man poses in front of an ad for beer."

# contradiction label 2
s2 = "One tan girl with a wool hat is running and leaning over an object, while another person in a wool hat is sitting on the ground. A boy runs into a wall."

classifier([s0, s1, s2])

```

```
[{'label': 'entailment', 'score': 0.9191838502883911},
 {'label': 'neutral', 'score': 0.9342461228370667},
 {'label': 'contradiction', 'score': 0.9903366565704346}]
```

