const aiResponses = {
  'hello': 'Hi there!',
  'how are you': 'I’m great, thanks! How about you?',
  'bye': 'ok bye See you later!',
  'what is your name': 'I’m Grok, your friendly AI assistant!',
  'tell me a joke': 'Why did the computer go to school? It wanted to improve its *byte*!',
  'what time is it': 'I can’t check the time, but you can look at your device!',
  'who are you': 'I’m mersa.ai, created by prasanna kumar to help you chat and learn!',
  'what can you do': 'I can chat, answer simple questions, and make you smile!',
  'good morning': 'Good morning! How’s your day starting?',
  'good night': 'Good night! Sweet dreams!',
};

const handleAIChat = (socket, msg) => {
  const response = aiResponses[msg.content.toLowerCase()] || 'I don’t understand that yet!';
  const aiMessage = {
      content: response,
      sender: 'AI',
      receiver: socket.userId,
      timestamp: new Date(),
      read: false,
  };
  const Message = require('mongoose').model('Message');
  new Message(aiMessage).save().then((savedMessage) => {
      socket.emit('message', savedMessage);
  });
};

module.exports = handleAIChat;