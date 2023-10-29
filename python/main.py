from flask import Flask, render_template, request, jsonify
import openai
import re
import json
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chatbot/<subject>/<num>/')
def chatbot(subject, num):
    # question = request.form['question']

    openai.api_key = ("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")

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=(f"Write a {num} question quiz with 4 multiple choice answers about {subject} and the answer displayed at the bottom in a format that is easy to parse using python using this format for the questions, 'Question 1: Question' and this format for the answer choices: ''a)', 'b)', 'c)', 'd)''. After every single question, print the correct answer using the format, 'Answer: 'a)' "),
        temperature=0.9,
        max_tokens=300,
        top_p=1,
        frequency_penalty=0.0,
        presence_penalty=0.6,
        stop=[" Human:", " AI:"]
    )

    json_object = json.dumps(response)

    with open("test.json", "w") as outfile:
        outfile.write(json_object)

    y = json.dumps(response)
    a = json.loads(y)

    message = a["choices"][0]["text"]

    print("m", message)
    questions = {}
    answers = []

    # Split the answer string by question using regex
    regex = r"(Question \d+: .*?(?=(?:Question \d+:)|$))"
    matches = re.findall(regex, message, re.DOTALL)

    for match in matches:
        # Extract the question text
        question = match.split("\n")[0]

        # Extract the answer choices
        choices = re.findall(r"(?<=\n)[a-d]\) .*?(?=\n|$)", match)

        # Store the question and choices in the dictionary
        questions[question] = choices

        # print('QUESTIONS', questions)
        # Extract the correct answer from the Answer line
        answer_match = re.search(r"Answer: ([a-d])", match)
        if answer_match:

            answers.append(answer_match.group(1))
        else:
            answer_match = re.search(r"Answer:([a-d])", match)
            if answer_match :
                answers.append(answer_match.group(1))
            else:
                answer_match = re.search(r"Answers: ([a-d])", match)
                if answer_match:
                    answers.append(answer_match.group(1))
                else:
                     answer_match = re.search(r"Answers:([a-d])", match)
                     if answer_match:
                        answers.append(answer_match.group(1))
            
            

    return jsonify({
        'questions': questions,
        'answers': answers
    })














@app.route('/flashcards/<subject>/<num>/')
def flashcards(subject, num):
    qType = subject
    numbers = num
    # question = request.form['question']

    openai.api_key = ("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")

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Write {num} question flashcards about {subject} and the answer displayed in a format that is easy to parse using python using this format for the questions, 'Question: question' and this format for the answer: 'Answer' ",
        temperature=0.9,
        max_tokens=300,
        top_p=1,
        frequency_penalty=0.0,
        presence_penalty=0.6,
        stop=[" Human:", " AI:"]
    )

    json_object = json.dumps(response)

    with open("test.json", "w") as outfile:
        outfile.write(json_object)

    y = json.dumps(response)
    a = json.loads(y)

    message = a["choices"][0]["text"]

    print("m", message)
    # questions = {}
    # answers = []

    questions = re.findall(r"Question:\s*(.*)", message)
    answers = re.findall(r"Answer:\s*(.*)", message)
            

    return jsonify({
        'questions': questions,
        'answers': answers
    })







@app.route('/placement/<subject>/')
def generate_placement_test(subject):

    openai.api_key = ("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")

    prompt = f"Write a 5 question placement test with 4 multiple choice answers about {subject} to assess what grade level of skill they are in that subject. Have the answer displayed at the bottom in a format that is easy to parse using python using this format for the questions, 'Question (without the question number so it should only be Question:): <question>' and this format for the answer choices: 'Answer Choices: 'a)', 'b)', 'c)', 'd)''. Display all the answer choices on the same line. After every single question, print the correct answer using the format, 'Answer: 'a) xxx' "

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.9,
        max_tokens=300,
        top_p=1,
        frequency_penalty=0.0,
        presence_penalty=0.6,
        stop=[" Human:", " AI:"]
    )

    y = json.dumps(response)
    a = json.loads(y)

    message = a["choices"][0]["text"]

    print("m", message)



    questions = re.findall(r"Question:\s*(.*)", message)
    answer_choices = re.findall(r"Answer Choices:\s*(.*)", message)
    answer = re.findall(r"Answer:\s*(.*)", message)


    return jsonify({
        "questions": questions,
        "answer_choices": answer_choices,
        "answer": answer
    })
    



if __name__ == '__main__':
    app.run(host='0.0.0.0')

	

# chatbot("Write a 20 question quiz with 4 multiple choice answers about math and the answer displayed at the bottom in a format that is easy to parse using python using this format for the questions, 'Question 1: Question' and this format for the answer choices: 'a), b), c), d)' "


