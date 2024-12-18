run :
	mvn spring-boot:run

NGROK_URL := powerful-nearly-sponge.ngrok-free.app
PORT ?= 8000

ngrok:
	ngrok http --url=$(NGROK_URL) $(PORT)
