const express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  nodemailer = require('nodemailer'),
  app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const lpAuth = Buffer.from(`${process.env.LP_KEY}:${process.env.LPS_KEY}`).toString('base64')
app.post('/lp', (req, res) => {
  request({
    method: 'POST',
    url: "https://financialmatch.leadspediatrack.com/post.do",
    qs: req.body.params,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${lpAuth}`
    }
  }, (error, response, body) => {
    if (error) throw new Error(error)
    res.send(body)
    const urlParams = new URLSearchParams(req.body.params).toString();
    request({
      method: 'get',
      url: `https://hooks.zapier.com/hooks/catch/13692587/3uskego?${urlParams}`,
    }, (error, response, body) => {
      if (error) console.log(error)
      console.log(body)
    })
  })
})

app.post('/hook', (req, res) => {
  request({
    method: 'get',
    url: `https://hooks.zapier.com/hooks/catch/13692587/3oa9fu6/?name=${req.body.params.name}&email=${req.body.params.email}&phone=${req.body.params.phone}&transaction_id=${req.body.params.transaction_id}&fbp=${req.body.params.fbp}&fbc=${req.body.params.fbc}&gclid=${req.body.params.gclid}`,
  }, (error, response, body) => {
    if (error) throw new Error(error)
    res.send(body)
  })
})

app.post('/email', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SG_HOST,
    port: process.env.SG_PORT,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SG_KEY,
    }
  })
  transporter.sendMail({
    from: '"Financial Match" <support@geekex.com>',
    to: `referrals@financialmatch.com`,
    subject: `Referral Partner Program | Financial Match`,
    html: `
      <p>First name: <strong>${req.body.params.firstName}</strong></p>
      <p>Last name: <strong>${req.body.params.lastName}</strong></p>
      <p>Email: <strong>${req.body.params.email}</strong></p>
      <p>Phone: <strong>${req.body.params.phone}</strong></p>
      <p>Notes: <strong>${req.body.params.notes}</strong></p>
    `
  })
    .then(response => {
      res.send({
        status: 'success',
        msg: response
      })
    })
    .catch(error => {
      res.send({
        status: 'error',
        msg: error
      })
    })
})

module.exports = {
  path: '/api',
  handler: app,
}
