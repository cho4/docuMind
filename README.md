## Inspiration💡
As exam season concludes, we came up with the idea for our hackathon project after reflecting on our own experiences as students and discussing common 
challenges we face when studying. We found that searching through long textbooks and PDFs was a time-consuming and frustrating process, even with search 
tools such as CTRL + F. We wanted to create a solution that could simplify this process and help students save time. Additionally, we were inspired by 
the fact that our tool could be particularly useful for students with ADHD, dyslexia, or anyone who faces difficulty reading large pieces of text.
Ultimately, our goal was to create a tool that could help students focus on learning, efficiently at that, rather than spending unnecessary time on 
searching for information.

## What it does 🤨
[docuMind](https://github.com/cho4/PDFriend) is a web app that takes a PDF file as input and extracts text to train GPT-3.5. This allows for summaries 
and accurate answers according to textbook information, among many features providing assistance such as text-to-speech, chat history, and 2FA. 

## How we built it 👷‍♂️
To bring life to docuMind, we employed ReactJS as the frontend, while using Python with the Flask web framework and SQLite3 database. 
After extracting the text from the PDF file and doing some data cleaning, we used OpenAI to generate word embeddings that we used pickle to serialize 
and store in our database. Then we passed our prompts and data to langchain in order to provide a suitable answer to the user. In addition, we allow 
users to create accounts, login, and access chat history using querying and SQLite. 

## Challenges we ran into 🏋️
One of the main challenges we faced during the hackathon was coming up with an idea for our project. We had a broad theme to work with, but it 
was difficult to brainstorm a solution that would be both feasible and useful. Another challenge we encountered was our lack of experience with 
Git, which at one point caused us to accidentally delete a source folder, spending a good chunk of time recovering it. This experience taught us 
the importance of backing up our work regularly and being more cautious when using Git. We also ran into some compatibility issues with the 
technologies we were using. Some of the tools and libraries we wanted to incorporate into our project were either not compatible with each other 
or presented problems, which required us to find workarounds or alternative solutions. 

## Accomplishments that we're proud of 🙌
Each member on our team has different things we’re proud of, but generally we are all proud of the project we managed to put together 
despite our unfamiliarity with many technologies and concepts employed. 

## What we learned 📚
We became much more familiar with the tools and techniques used in natural language processing, as well as frontend and backend development, 
connecting the two, and deploying an app. This experience has helped us to develop our technical skills and knowledge in this area and has inspired 
us to continue exploring this field further. Another important lesson we learned during the hackathon was the importance of time management. We spent 
a large portion of our time brainstorming and trying to come up with a project idea, which led to being slightly rushed when it came to the 
execution of our project. We also learned the importance of communication when working in a team setting. Since we were working on separate parts 
of the project at times, it was essential to keep each other updated on our progress and any changes we made. This helps prevent accidents like 
accidental code deletion or someone getting left behind so far they can’t push their code to our repository. Additionally, we learned the value of 
providing clear and concise documentation to help others understand our code and contributions to the project.

## What's next for docuMind 🔜
To enhance docuMind’s usability, we intend to implement features such as scanning handwritten PDFs, image and diagram recognition, multi-language 
support, audio input/output and cloud-based storage and collaboration tools. These additions could greatly expand the tool's utility and help users 
to easily organize and manage their documents.
