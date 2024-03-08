import boto3
import requests
import json
import urllib.parse
import argparse

def send_html_email(path, email_addr, token_str):
    ses_client = boto3.client("ses", region_name="us-east-1")
    CHARSET = "UTF-8"

    with open(path, encoding="utf-8") as f:
        html_template = f.read().replace('TOKEN_VAL',token_str)
        f.close()

    response = ses_client.send_email(
        Destination={
            "ToAddresses": [
                email_addr,
            ],
        },
        Message={
            "Body": {
                "Html": {
                    "Charset": CHARSET,
                    "Data": html_template,
                }
            },
            "Subject": {
                "Charset": CHARSET,
                "Data": "Still interested in the room?",
            },
        },
        Source="The SlashID Hotel <hello@slashid.dev>",
    )
    print(response)

def find_person_by_handle(handle_type, handle, host, org_id, api_key):
    headers = {
        "SlashID-OrgID": org_id,
        "SlashID-API-Key": api_key
    }
    resp = requests.get(host + f"/persons?handle={handle_type}:{handle}", headers=headers)
    if resp.status_code != 200:
        print(resp)
        raise Exception

    person_ids = []
    d = resp.json()
    for p in d['result']:
        person_ids.append(p["person_id"])
    print(f"Found {len(person_ids)} persons for this org")
    return person_ids

def create_magic_link(host, org_id, api_key, person_id):

    data = {
        "duration_secs": 100000
    }

    headers = {
        "SlashID-OrgID": org_id,
        "SlashID-API-Key": api_key
    }

    response = requests.post(host+f"/persons/{person_id}/direct-id", headers=headers, json=data)
    data = json.loads(response.content)

    if response.ok:
        return data['result']

    print(data)
    raise Exception

def handle_type_validation(astring):
    if astring != "email_address":
        raise ValueError('Only allowed values is email_address') # standard error
    return astring

def main(args):
    print(args)
    safe_handle = urllib.parse.quote_plus(args.handle)
    person_ids = find_person_by_handle(args.handle_type, safe_handle, args.host, args.org_id, args.api_key)
    if len(person_ids) == 0:
       print("Unable to find the user")
       return
    elif len(person_ids) > 1:
        print("Too many users")
        return
    pid = person_ids[0]
    print(pid)
    val = create_magic_link(args.host, args.org_id, args.api_key, pid)
    send_html_email(args.template_path, args.handle, val)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("handle_type", default="", type=handle_type_validation, help='email_address')
    parser.add_argument("handle", default="", help='the person handle')
    parser.add_argument("--template_path", default="resume-flow.html", required=False)
    parser.add_argument("--org_id", default="f978a6bd-3e45-bcda-cb4e-573d0bad155b", required=False)
    parser.add_argument("--api_key", default="", required=False)
    parser.add_argument("--host", default="https://api.slashid.com", required=False)
    args = parser.parse_args()

    main(args)
