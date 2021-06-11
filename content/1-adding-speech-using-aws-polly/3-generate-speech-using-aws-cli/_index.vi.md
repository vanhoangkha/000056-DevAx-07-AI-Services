+++
title = "Tạo speech bằng AWS CLI"
weight = 3
chapter = false
pre = "<b>1.3. </b>"
+++

1. Tải xuống tập tin **pollySpeech.sh**
2. Mở terminal, **cd** tới thư mục chứa tập tin **pollySpeech.sh** vừa tải, thực thi câu lệnh sau:
```bash
chmod +x pollySpeech.sh
./pollySpeech.sh
```
![Polly](/images/1/8.png?width=90pc)
Đoạn script trên sẽ gọi Amazon Polly để sinh giọng nói và chạy lại nó sử dụng **mpg123**. Nếu bạn không cài đặt **mpg123** trong máy, bạn có thể cài đặt chúng bằng cách sử dụng **Homebrew**, hoặc sử dụng trình chơi nhạc MP khác tùy chọn của bạn. 
Nếu sử dụng **mpg123**, bạn có thể tải xuống tại [link](https://www.mpg123.de/download/win64/1.26.3/) và giải nén chúng.
Mở Git Bash và chạy lệnh sau: 
**export PATH="<filepath>\mpg123-1.26.3-x86-64:$PATH"
**
