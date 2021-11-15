import psutil
import time
import logging
from tb_device_mqtt import TBDeviceMqttClient

# dependently of request method we send different data back
def on_server_side_rpc_request(_, request_id: int, request_body: dict):
    try:
        if request_body["method"] == 'checkStatus':
            client.send_rpc_reply(request_id, "true")
        elif request_body["method"] == 'getStatus':
            print("Get status")
            client.send_rpc_reply(request_id, "true")
        elif request_body["method"] == 'setStatus':
            print("set status", request_body)
        elif request_body["method"] == 'setIntensity':
            print("set intensity", request_body)
        elif request_body["method"] == 'getIntensity':
            print("Get intensity")
            client.send_rpc_reply(request_id, 99)
    except Exception as e:
        print(e)

client = TBDeviceMqttClient("127.0.0.1", "DzV8P2RnMtmW9KMF0z2A")
client.set_server_side_rpc_request_handler(on_server_side_rpc_request)
client.connect()
while True:
    time.sleep(1)