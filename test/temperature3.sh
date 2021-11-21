HOST_NAME="http://localhost:8080"
ACCESS_TOKEN="VL7AfMMa7S7Pyxa91M2F"
curl -v -X POST -d "{\"temperature\": $1, \"humidity\": $2, \"locationX\": "1", \"locationY\": "2"}" http://localhost:8080/api/v1/$ACCESS_TOKEN/telemetry --header "Content-Type:application/json"