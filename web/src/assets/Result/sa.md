- attacker: 攻击类型，对于情感分析任务分为：
  - PWWSAttacker
  - DeepWordBugAttacker
  - GANAttacker

- result: 攻击结果，以Json类型展示
  - Total Attack Instances: 攻击的样本数量
  - Successful Instances: 攻击成功的样本数量，即模型做出失败判断的数量
  - Attack Success Rate: 攻击成功率
  - Avg. Running Time: 平均攻击时间
  - Total Query Exceeded: 
  - Avg. Victim Model Queries: 
- score: 最终得分

$$
score = \sum (1-Attack\space Success\space Rate)
$$

