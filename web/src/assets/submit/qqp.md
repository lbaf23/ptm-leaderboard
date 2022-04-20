对于 `positive` 的语句输出结果为 `{'label': 'LABEL_1', 'score': 0.9992368221282959}`

对于 `negative` 的语句输出结果为 `{'label': 'LABEL_0', 'score': 0.9988390803337097}`

例如

```python
import transformers

# model id
model_path = 'echarlaix/bert-base-uncased-sst2-acc91.1-d37-hybrid'

tokenizer = transformers.AutoTokenizer.from_pretrained(model_path)

model = transformers.AutoModelForSequenceClassification.from_pretrained(model_path)
classifier = transformers.pipeline('text-classification', tokenizer=tokenizer, model=model)

s0 = "I hate that movie"
s1 = "I like that movie"

classifier([s0, s1])
```

```
[{'label': 'LABEL_0', 'score': 0.9988390803337097},
 {'label': 'LABEL_1', 'score': 0.9992368221282959}]
```

