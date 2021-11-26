import 'package:json_annotation/json_annotation.dart';

enum RpcMethod {
  @JsonValue("getStatus")
  getStatus,
  @JsonValue("getIntensity")
  getIntensity,
  @JsonValue("setStatus")
  setStatus,
  @JsonValue("setIntensity")
  setIntensity
}