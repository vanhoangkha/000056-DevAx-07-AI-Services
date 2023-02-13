+++
title = "Khám phá Amazon Polly"
weight = 2
chapter = false
pre = "<b>1.2. </b>"
+++

Trong bài tập này, bạn sẽ xem xét Amazon Polly console để sinh giọng nói.
1. Truy cập AWS Polly và chọn **Try Polly**

![Polly](/images/1/1.png?width=90pc)

2. Chọn **Listen** để phát lại văn bản mặc định cho giọng nói mặc định 'Joanna'.

![Polly](/images/1/2.png?width=90pc)

3. Hãy dành chút thời gian để thử nghiệm với các ngôn ngữ và giọng nói khác nhau có sẵn 
4. Tải tập tin MP3 bằng cách chọn **Download**. Phát lại tập tin này trong máy tính của bạn.

#### Định nghĩa và sử dụng Lexicon

5. Chọn *English, US* và *Joanna* voice và nhập đoạn sau vào trường **Input text**
```
Synthesizing speech is easy with AWS
```
6. Nhấn **Listen** để nghe đoạn văn bản đã được chuyển thành giọng nói

![Polly](/images/1/3.png?width=90pc)


7. Chúng ta sẽ định nghĩa một **alias** cho **AWS** để tên đầy đủ - *Amazon Web Services* sẽ được hiển thị khi cũng cấp **AWS**. Tải xuống tập tin **lexicon.pls**

{{%attachments /%}}

8. Mở terminal, **cd** tới thư mục nơi mà bạn tải xuống tập tin **lexicon.pls**, sau đó sử dụng lệnh sau:
```
aws polly put-lexicon --name awsExpansion --content file://lexicon.pls --profile aws-lab-env
```
{{% notice note %}} 
Nếu bạn đang chạy trên Windows hoặc trên máy của chính mình, đừng quên thêm cấu hình bằng `--profile aws-lab-env`
{{% /notice %}}

Câu lệnh trên sẽ tạo một lexicon mới
Lưu ý cách chúng ta tạo một **alias** cho một **grapheme** cho trước. Khi chúng được hiển thị, **AWS** sẽ được thay thế bằng **Amazon Web Services**

9. Làm mới lại trình duyệt và bạn sẽ thấy lexicon mới được hiển thị.

![Polly](/images/1/4.png?width=90pc)

10. Nhập vào đoạn văn bản sau trong trường **Input text**
```
Synthesizing speech is easy with AWS
```
11. Cuộn xuống mục **Additional setting** và nhấp vào để hiển thị bảng điều khiển. Sau đó kích hoạt **Customise pronunciation**
12. Trong danh sách **Apply lexicon** chọn **awsExpansion**
13. Chọn **Listen** để nghe đoạn văn bản được thực hiện.

![Polly](/images/1/5.png?width=90pc)

#### Sử dụng SSML để biểu diễn giọng nói

14. Kích hoạt **SSML** và dán đoạn sau vào 
```
<speak>
	My name is YOUR_NAME. It is spelled
	<prosody rate='x-slow'>
		<say-as interpret-as="characters">YOUR_NAME</say-as>
	</prosody>
</speak>
```
Thay thế **YOUR_NAME** bằng tên của bạn

15. Chọn **Listen** để nghe tên của bạn được đọc lên.

![Polly](/images/1/6.png?width=90pc)

16. Thay thế SSML với bằng đoạn sau:
```
<speak>
	This is normal voice,
	<amazon:effect name="whispered">
		and this is me whispering AWS!
	</amazon:effect>
</speak>
```

![Polly](/images/1/7.png?width=90pc)

17. Chọn **Listen** để nghe đoạn văn bản được được ở giọng bình trường và giọng thì thầm
18. Thử nghiệm với các giọng nói và đoạn văn bản khác nhau để cảm nhận những điều mà Polly có thể làm.