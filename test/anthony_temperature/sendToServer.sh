HOST_NAME="http://localhost:8080"
ACCESS_TOKEN="oHhMQLoQgc3a4KrG5lVD"
# The data you send to the serveur should be like this
# Simply a post request to http://localhost:8080/api/v1/$ACCESS_TOKEN/telemetry with body "{\"temperature\": $1, \"humidity\": $2, \"latitude\": "1", \"longitude\": "2"}"
curl -v -X POST -d "{\"temperature\": 1, \"humidity\": 2, \"latitude\": 1, \"longitude\": 2}" http://localhost:8080/api/v1/$ACCESS_TOKEN/telemetry --header "Content-Type:application/json"