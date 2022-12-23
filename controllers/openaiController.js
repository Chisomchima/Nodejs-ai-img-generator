const { response } = require("express");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const {prompt, size} = req.body;
    // const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'

  try {
    const response = await openai.createCompletion({
        // model:'davinci',
        prompt,
        n:1,
        size
    });
    // const imgUrl = response.data.data[0].url
    console.log(response, 'response');
    res.status(200).json({
        success: true,
        // data: imgUrl
    })
  } catch (error) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    res.status(400).json({
        success: false,
        error: 'image could not be generated'
    });
  }
}

module.exports = { generateImage }