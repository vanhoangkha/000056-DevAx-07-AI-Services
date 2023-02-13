+++
title = "Tạo speech marks bằng AWS Polly SDK dành cho Java"
weight = 5
chapter = false
pre = "<b>1.5. </b>"
+++

Trong bài tập này, bạn sẽ khám phá cách tạo giọng nói sống động bằng cách dùng Java SDK. Ứng dụng trình bày một menu các tùy chọn mà bạn có thể sử dụng để kiểm tra các tính năng của ứng dụng.
1. Tải tập tin **PollyControl.zip** và giải nén.

{{%attachments /%}}

2. Mở **Eclipse IDE** và import project vào Eclipse IDE.
3. Hầu hết đoạn code đã được triển khai cho bạn. Tuy nhiên, cần phải triển khai khả năng ứng dụng hiển thị các từ đúng lúc với âm thanh đầu ra. Chúng ta cần một API call tới Amazon Polly thông qua SDK để truy xuất các speech marks.
Một triển khai *hình nộm* được đưa ra cho bạn trong phưong thức **GetSpeechMarkers()** trong tập tin **/PollyControl/src/main/java/idevelop/samples/PollyManager.java**. Triển khai hình nộm một đối tượng trả về như thể nó được trả về từ dịch vụ Polly khi gọi synthesizeSpeech().
```java
		String dummySpeechMarks = "{\"time\":1,\"type\":\"word\",\"start\":0,\"end\":100,\"value\":\"You need to implement the call to SynthesizeSpeechRequest() in GetSpeechMarkers()\"}\n";
		InputStream dummyStream = new ByteArrayInputStream(
				dummySpeechMarks.getBytes(StandardCharsets.UTF_8.name())
				);
		SynthesizeSpeechResult synthRes = new SynthesizeSpeechResult().withAudioStream(dummyStream);

```

![Polly](/images/1/10.png?width=90pc)

Bạn cần xóa đoạn code này và tay thế với đoạn code thực sự gọi dịch vụ Amazon Polly chứa speech marks.\
4. Chạy lại ứng dụng, bạn sẽ thấy menu như sau

![Polly](/images/1/11.png?width=90pc)

Thử chạy từng tùy chọn của menu và nhận thấy rằng khi lời nói được biểu diễn, văn bản tương ứng cũng sẽ được hiển thị cùng lúc với âm thanh. Điều này được thực hiện trước tiên bằng cách ứng dụng yêu cầu các speech marks từ Amazon Polly, sau đó yêu cầu hiển thị âm thanh. Khi âm thanh được phát, một chuỗi nền sẽ theo dõi vị trí của âm thanh được phát lại và sử dụng dữ liệu dấu giọng nói để hiển thị từ đúng cùng lúc với âm thanh.

Hãy dành một chút thời gian để xem qua đoạn code để biết cách thực hiện điều này