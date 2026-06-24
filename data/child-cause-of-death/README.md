This is the data I used for my book, Dont’t Trust: Verify, for the section on gun deaths and children.

There are a lot of sheets for the raw data (RD). It all comes from the CDC, at http://wonder.cdc.gov/controller/saved/D158/D434F230.

Data is available as:
- [Numbers](https://raw.githubusercontent.com/pudge/verify/refs/heads/🕵️‍♂️/data/child-cause-of-death/child-cause-of-death.numbers) (.numbers)
- [Excel](https://raw.githubusercontent.com/pudge/verify/refs/heads/🕵️‍♂️/data/child-cause-of-death/child-cause-of-death.xlsx) (.xlsx)
- [separate CSV files in an archive](https://raw.githubusercontent.com/pudge/verify/refs/heads/🕵️‍♂️/data/child-cause-of-death/child-cause-of-death.zip) (.zip)
- [Google Sheets](https://docs.google.com/spreadsheets/d/1zL-E9B_a_Po4prhnjJvglqTfCAcjcfuIZQrVwxVjjtk/edit?usp=sharing)

All data is selected for:
- Ages 0-19
- Year 2023

All raw data sheets begin with “RD” and include:
- Injury Mechanism & All Other Leading Causes (and Code)
- Deaths (the total number of deaths)
- Population (the total size of the population)
- Crude Rate (deaths / population x 100,000)

I wanted to look at not just all ages 0-19, but also at specific intents, age groups, races, and sexes.

It would be nice to just have one single sheet with all the data, which is what I did at first, but there is a problem with that: the CDC hides data when the numbers get too small. Imagine 100 girls die from a certain disease. If you slice the data by sex and age, maybe you will see 90 deaths spread across ages 10-17, but 0 from 0-9, because the numbers are too small, so the results are hidden.

 So to get the best data, I fetched every combination, for the four characteristics I cared about, to get the best granularity. If I am looking only at race and age, I use the RD-A,R sheet. If I want to look at intent, it is RD-I,A,R. And so on.

Urbanization is not as interesting or useful, because the categories are somewhat vague and no Population or Crude Rate is provided, so urbanization was left out of the book’s analysis, and I did not bother fetching all the combinations with urbanization.

The code for what comes after “RD-” is as follows, with the additional data for each:
- I - intent
  - Injury Intent (and Code)
    - Homicide
    - Legal Interventions / Operations of War
    - Suicide
    - Unintentional
    - Undetermined
    - Non-Injury, no intent classified
- A - age
  - Single-Year Ages (and Code)
    - 0-19
- R - race
  - Single Race 6 (and Code)
    - American Indian or Alaska Native
    - Asian
    - Black or African American
    - Native Hawaiian or Other Pacific Islander
    - White
    - More than one race
- S - sex
  - Sex (and Code)
    - Male
    - Female
- U - urbanization
  - 2013 Urbanization (and Code)
    - Large Central Metro
    - Large Fringe Metro
    - Medium Metro
    - Small Metro
    - Micropolitan (Nonmetro)
    - NonCore (Nonmetro)
