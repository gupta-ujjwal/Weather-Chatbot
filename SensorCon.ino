#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <dht.h>
#include <ThingSpeak.h>

#define sensor D4

dht DHT;

WiFiClient client;

String page = "";
int dt, temp, humidity; 
String myStatus="";

unsigned long myChannelNumber=720956;
const char * myWriteAPIKey = "B9MXMJPMOSXBQKV3";

// WiFi parameters to be configured
const char* ssid = "AndroidAP";
const char* password = "Piyu@1234";

void setup(void)
{ 
  
  pinMode(sensor, INPUT);
  
  Serial.begin(9600);
  // Connect to WiFi
  WiFi.begin(ssid, password);

  // while wifi not connected yet, print '.'
  // then after it connected, get out of the loop
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }
  
  //print a new line, then print WiFi connected and the IP address
  Serial.println("");
  Serial.println("WiFi connected");
  // Print the IP address
  Serial.println(WiFi.localIP());
  ThingSpeak.begin(client);


  
  
}
void loop() {
  
  
  static boolean data_state= false;
  dt=DHT.read11(sensor);
  temp=DHT.temperature;
  humidity=DHT.humidity;
  Serial.println(temp);
  Serial.println(humidity);

  ThingSpeak.setField(1, temp);
  ThingSpeak.setField(2, humidity);
  
  ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
   delay(100);
  
}

