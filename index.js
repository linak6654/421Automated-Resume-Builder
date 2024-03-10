const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  { id: 1, username: 'john_doe', password: 'password123', resumes: [] },
  // 添加更多用户数据...
];

// 处理获取用户创建的所有简历的请求
app.get('/resumes/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ resumes: user.resumes });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理创建新简历的请求
app.post('/resumes/:userId/create', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { title, personalInfo, education, experience, skills } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newResume = { id: user.resumes.length + 1, title, personalInfo, education, experience, skills };
    user.resumes.push(newResume);
    res.json({ message: 'Resume created successfully', resume: newResume });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理根据简历ID获取简历的请求
app.get('/resumes/:userId/:resumeId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const resumeId = parseInt(req.params.resumeId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    const resume = user.resumes.find((r) => r.id === resumeId);

    if (resume) {
      res.json({ resume });
    } else {
      res.status(404).json({ message: 'Resume not found' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
