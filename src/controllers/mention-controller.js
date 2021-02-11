const repository = require('../repositories/mention-repository');
const jwt = require('jsonwebtoken');

// list
exports.listMentions = async (req, res) => {

  try {

    // const token = req.headers['x-access-token'];
    // if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, process.env.SECRET, function(err, decoded) {
    //   if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    //   console.log(decoded.nome);
    // });      

    const data = await repository.listMentions();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};

// create
exports.createMention = async (req, res) => {
  try {
    await repository.createMention({
      friend: req.body.friend,
      mention: req.body.mention
    });
    res.status(201).send({message: 'Menção cadastrada com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar a menção.'});
  }
};