## Report:

```sql
SELECT * FROM crime_scene_report
WHERE date = '20180115' AND city = 'SQL City' AND type = 'murder';
```

Security footage shows that there were 2 witnesses. The first witness lives at the last house on "Northwestern Dr" (14887). The second witness, named Annabel, lives somewhere on "Franklin Ave".


id	name	license_id	address_number	address_street_name	ssn
14887	Morty Schapiro	118009	4919	Northwestern Dr	111564949
16371	Annabel Miller	490173	103	Franklin Ave	318771143

## Transcripts:

```sql
SELECT person.id, person.name, interview.transcript
FROM person, interview
WHERE interview.person_id = person.id
AND ((address_street_name = 'Northwestern Dr'
AND address_number = (
  SELECT MAX(address_number)
  FROM person
  WHERE address_street_name = 'Northwestern Dr'
))
OR (name LIKE 'Annabel%' AND address_street_name = 'Franklin Ave'));
```

I heard a gunshot and then saw a man run out. He had a "Get Fit Now Gym" bag. The membership number on the bag started with "48Z". Only gold members have those bags. The man got into a car with a plate that included "H42W".

- Membership bag started with 48Z.
- Car plate included H42W.
- Worked out on January the 9th.

## Murderer:

```sql
SELECT person.id, person.name,
    get_fit_now_check_in.check_in_time, get_fit_now_check_in.check_out_time,
    drivers_license.plate_number,
    get_fit_now_member.id AS member_id, get_fit_now_member.membership_status
FROM get_fit_now_check_in, get_fit_now_member, drivers_license, person
WHERE get_fit_now_member.id = get_fit_now_check_in.membership_id
AND drivers_license.id = person.license_id
AND get_fit_now_member.person_id = person.id
AND get_fit_now_check_in.check_in_date = 20180109
AND get_fit_now_member.id LIKE '48Z%'
AND drivers_license.plate_number LIKE '%H42W%';
```

