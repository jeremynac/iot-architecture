HOST_NAME="http://localhost:8080"
ACCESS_TOKEN="yTRD3Zx763rLqeZckv3F"
curl -v -X POST -d "{\"consumed\": 2, \"capacity\": 4, \"needed\": 2}" http://localhost:8080/api/v1/$ACCESS_TOKEN/telemetry --header "Content-Type:application/json"