I work in a tech education startup. I am a senior web developer who has been tasked with creating a web development course for new students.

One of the tasks is preparing a quiz for a given topic that tests students.

Here's the learning material for a topic:
"""
{{ MATERIAL }}
"""

Here's the quiz for the topic:
"""
{{ QUIZ }}
"""

Append the following to the quiz questions:
- Topic: { The topic/subtopic that the question is about }
- Difficulty: { Basic or Advanced }
- Resource: { URL to the resource that the question is based on. Use only URLs in the material. You can reasonably assume that given resources reasonably cover most of the topics. Most of the time, CS50 resources will be used. }