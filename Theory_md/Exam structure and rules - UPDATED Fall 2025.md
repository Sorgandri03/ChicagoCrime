1
Visual Analytics
Fall 2025 updated on 16.12.2025
Exam structure and rules
carefully
(read these slides )

Exam 2
Exam encompasses 3 main parts

| • Project (mandatory)  |     |     |      | up to25 points |
| ---------------------- | --- | --- | ---- | -------------- |
• a full working visual analytics solution
| • Report (mandatory)      |     |     |     | up to 5  points |
| ------------------------- | --- | --- | --- | --------------- |
• a up to 5 pages report structured as a scientific paper describing
      your project and showing proposals close to your solution
| • October home_work (optional)  |     |     |     | up to3 points |
| ------------------------------- | --- | --- | --- | ------------- |
•
It will be evaluated at exam time

Rules 3
The exam can be completed individually or in group of MAX 3 persons.
2 tiers of projects:
• Free proposal
• Project proposal comes from the student/group (select data that you like!!)
• Project proposed by me (more challenging projects, group of 2/3 people):
• We will provide a specification for the project (dataset, goals, eventual additional
requirements) on demand
• You need to write me an e-mail explicitly requiring to conduct this tier
• The proposal will be positioned on themes of my research group
• If the work is of good quality, it can be continued/extended along with the Master Thesis

Rules 4
• For both tiers, a preliminary approval is needed: before starting working on the project you MUST
send me an e-mail with a 1 page draft of the idea that:
• Specify the dataset (characteristics and context)
• Specify the general idea (Analytics part, Visual Part)
1. Data
2. Used visualizations and dimensionality reduction
3. Used analytics
4. Coordinated views (a least 2)
5. How do you trigger visually the analytics
• Not using a menu, not selecting a radio button
6. How the analytics result is presented to the user
• Specify the intended user
• A mockup of the user interface (draft)

Rules 5
• Mandatory: the project MUST use a dimensionality reduction technique (e.g.,PCA, MDS,
or a t-SNE) and integrate it in the analysis flow
• Mandatory: VISUALIZATION: every assignment MUST have a visual part constituted by at
least 2 visualizations coordinated in both ways and interactive
• Mandatory ANALYTICS: every assignment MUST contain at least 1 computation that is triggered
by user visual interactions (no change in the dataset, no simple filter, no simple selection from a
menu)

Project positioning 6
• Analysis of scientific papers related to the project
• similar technical solution
• similar objectives
• similar dataset
• Discussion of:
• related proposals
• related techniques
• differences with respect to the assignment

7
Project positioning
Where to look for related proposals:
Text search
• Google Scholar: https://scholar.google.it/schhp?hl=it
• IEEE Explore: https://ieeexplore.ieee.org/Xplore/home.jsp
• ACM Digital Library: https://dl.acm.org/
Search by topics (e.g. , visualization for network medicine) and browse the results
Scientific related venues:
• IEEE VIS
• EuroVIS
Browse the proceedings (look at the papers of each edition and select the most related ones
to your exam)

Dataset 8
You are all encouraged to propose a context and a datasets of your choice on topics that you find interesting
to analyze, e.g.:
1. Sport analytics (football, tennis, sailing, etc.)
2. Bitcoin, block chain
3. Network traffic data
4. Social networks analysis
5. Vast 202x challenge
6. Data coming from the datasets described in the following slides
• The Dataset MUST respect the rule that the index AS (AngeliniSantucci) defined as:
AS= #tuples * #dimensions
is contained in the range 10,000 – 50,000 (and more for the braves…..)

Datasets 9
DataSets:
1. Data from ISTAT:
• Many different datasets are available from a main data-warehouse
http://dati-censimentoindustriaeservizi.istat.it/
2. Italian Government Open Data
https://www.dati.gov.it/view-dataset
3. Top World Universities Rankings:
http://www.topuniversities.com/university-rankings

Datasets 10
DataSets:
4. IEEE VAST-Challenge in the last years (Conference on Visual Analytics Science and Technology)
• 3 different mini-challenge, application for 1 of them
• An e-mail address is required for downloading the dataset
• Check for last edition when it get published (still not, usually January)
• Possibility to submit a work on the challenge if good (coordination needed with us, write an e-mail
for that)
https://vast-challenge.github.io/2025/
https://vast-challenge.github.io/2024/ ...
5. Users Ratings on Movies:
• Also IMDB can be a good resources for well-known ones.
http://grouplens.org/datasets/movielens/
6. UCI datasets:
https://archive.ics.uci.edu/ml/index.php

Datasets 11
DataSets:
7. Italian Top Scientists:
http://www.topitalianscientists.org/
8. Kaggle datasets:
https://www.kaggle.com/datasets
9. CyberSecurity datasets:
http://vizsec.org/data/
10. Network analysis (generic networks) data:
http://snap.stanford.edu/
11 COVID-19 data:
https://github.com/pcm-dpc/COVID-19

12
Project structure
• The assignment MUST contain (you have to provide a github link):
• The running software
• A relation (5-6 pages) similar to a scientific paper that describes the whole design process,
rationale and prototype, comprehensive of the related work section that describes the
related papers, and the discovered insights section.
• A PowerPoint presentation describing the goal of the project, the data structure, and the
chosen visualizations (not the user interaction, that must be presented during the demo
of the system)
• The exam will consist in
• a) presenting the PowerPoint material (each student MUST present a part of the content ) max 20’
• b) giving a live demo of the system
• c) answering questions on both the presentation and the demo

Steps and dates 13
1. Create a group
2. Select a dataset, the domain of the VA application, and the intended user(s)
3. Send me 1 page draft for the approval request (when you have it ready)
• In the email subject write VA 2025project approval request
4. Wait for the approval and the group number 25_x (use it in any following mail messages)
5. Exam booking: (exams will be in presence and remotely)
• January and February 2026: when you are ready send an email to me by 10 January or by 10 February with
the github link
• In the email subject write group 25_x exam booking
• The exam will take place in the next 10 / 15 days
• Other sessions: send me an email by the first date of the session with the github link
• In the email subject write group 25_x exam booking
• The exam will take place in the next 10 / 15 days
• Contact me for emergencies (Erasmus, Master degree exam approaching, etc.)
• In the email subject write group 25_x <request>

Evaluation criteria 14
• Create projects that are useful:
• Target one or more potential users of your system
• Use your system to find insights, not just for interacting with it
• Refine your project to reach the desired insights
• Prioritize quality over quantity:
• A well-crafted system composed of 3/4 refined visualizations, highly coordinated and
interactive, and with good analytical functions is BETTER than a 10 visualizations
dashboard with limited interaction and no implemented analytics
• Avoid Pitfalls:
• see next slide

15
| Exclusion | criteria |     | and penalty list |     |     |
| --------- | -------- | --- | ---------------- | --- | --- |
• Exclusion criteria (the project will not be evaluated)
• Missing or wrong 1 page draft of the idea
• Missing dimensionality reduction
• Missing GitHub site
• Penalty list
• Missing two coordinated visualizations      (5 points penalty)
| • Missing related work  |     |     |     |     | (5 points penalty) |
| ----------------------- | --- | --- | --- | --- | ------------------ |
• Missing analytics triggered by visual interaction    (5 points penalty)
• Dimensionality reduction NOT integrated in the analysis flow  (2 points penalty)
| • Not standard color encodings  |     |     |     |     | (2 points penalty)  |
| ------------------------------- | --- | --- | --- | --- | ------------------- |
| • Missing legends               |     |     |     |     | (2 points penalty)  |
• Scrollable views not justified by design constraints    (2 points penalty)
• Too strong reuse of existing solutions    (2 points penalty)
| • Missing insights  |     |     |     |     | (2 points penalty) |
| ------------------- | --- | --- | --- | --- | ------------------ |
• Missing or not convincing intended system user    (2 points penalty)