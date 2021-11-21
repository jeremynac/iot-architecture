ACCESS_TOKEN="DzV8P2RnMtmW9KMF0z2A"
# Pour envoyer l'intensité ou le statut au serveur, quand on les change manuellement dans l'app
mosquitto_pub -d -h "127.0.0.1" -t "v1/devices/me/attributes" -u "$ACCESS_TOKEN" -m "{\"intensity\": $1, \"status\": "on"}"