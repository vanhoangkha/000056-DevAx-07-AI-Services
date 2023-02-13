aws polly synthesize-speech \
	--region us-east-1 \
	--output-format mp3 \
	--voice-id Russell \
	--profile aws-lab-env \
	--text "Good morning everyone, knock knock..." test.mp3

mpg123 test.mp3

aws polly synthesize-speech \
	--region us-east-1 \
	--output-format mp3 \
	--voice-id Nicole \
	--profile aws-lab-env \
	--text "Who's there?" test.mp3

mpg123 test.mp3

aws polly synthesize-speech \
	--region us-east-1 \
	--output-format mp3 \
	--voice-id Russell \
	--profile aws-lab-env \
	--text "Llama" test.mp3

mpg123 test.mp3

aws polly synthesize-speech \
	--region us-east-1 \
	--output-format mp3 \
	--voice-id Nicole \
	--profile aws-lab-env \
	--text "Llama who?" test.mp3

mpg123 test.mp3

aws polly synthesize-speech \
	--region us-east-1 \
	--output-format mp3 \
	--voice-id Russell \
	--profile aws-lab-env \
	--text "Don't be uh-Llama'd, it's only me!" test.mp3

mpg123 test.mp3