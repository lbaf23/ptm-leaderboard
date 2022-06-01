**Attack Result**

- attacker: 攻击类型，对于情感分析任务分为：
  - PWWSAttacker
  - DeepWordBugAttacker
  - GANAttacker
  - PSOAttacker
  - HotFlipAttacker
  
- result: 攻击结果，以Json类型展示
  - Total Attack Instances: 攻击的样本数量
  - Successful Instances: 攻击成功的样本数量，即模型做出失败判断的数量
  - Attack Success Rate: 攻击成功率
  - Avg. Running Time: 平均运行时间
  - Total Query Exceeded: 总查询超限次数
  - Avg. Victim Model Queries: 平均查询数量
- score: 最终得分

$$
success = \sum_{i=1}^n Successful\space Instances_i
\\
total = \sum_{i=1}^n Total\space Attacked\space Instances_i
\\
总分：score = (total - success) \times 100 \div total
\\
单项分数：score = (Total\space Attacked\space Instances - Successful\space Instances)
\\
\times 100 \div Total\space Attacked\space Instances
$$



