const chatbotScript = document.createElement("script")

chatbotScript.innerHTML = `
          src="https://jiyao-chatbot-widget.s3.amazonaws.com/chatbot-widget.min.js"
          data-stream-url="https://dd63bb6z7j4r7pyiwvi5sqmhcq0gsgyz.lambda-url.us-east-1.on.aws/"
          data-admin-url="https://34i2s32sx774dqpo6wssfi2jzy0ycwmw.lambda-url.us-east-1.on.aws"
          data-tenant-id="dotfiles-configurator"
          data-primary-color="#0073e6">
`

document.body.append(chatbotScript);
