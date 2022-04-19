对于 `positive` 的语句输出结果为 `{'label': 'LABEL_1'}`

对于 `negative` 的语句输出结果为 `{'label': 'LABEL_0'}`

- positive

```python
import transformers

model_path = 'hfl/chinese-bert-wwm'

tokenizer = transformers.AutoTokenizer.from_pretrained(model_path)
model = transformers.AutoModelForSequenceClassification.from_pretrained(model_path)

classifier = transformers.pipeline('text-classification', tokenizer=tokenizer, model=model)

classifier("拿房时没大床房了，给我们免费升成套房，这点还蛮满意的。酒店大致不错，有国内五星水准。比国际品牌的要差一点。酒店有点年纪了，维修要加强，比如我们浴室的下水就堵塞不通，这些在客人入住前就该发觉修好。其它都还可以。")
```

```
[{'label': 'LABEL_1', 'score': 0.8547860383987427}]
```

- negative

```python
import transformers

model_path = 'hfl/chinese-bert-wwm'
tokenizer = transformers.AutoTokenizer.from_pretrained(model_path)
model = transformers.AutoModelForSequenceClassification.from_pretrained(model_path)

classifier = transformers.pipeline('text-classification', tokenizer=tokenizer, model=model)
classifier("房间 太小 。 其他 的 都 一般 。 。 。 。 。 。 。 。 ")
```

```
[{'label': 'LABEL_0', 'score': 0.7363871932029724}]
```
