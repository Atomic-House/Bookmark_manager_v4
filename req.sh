
echo "Enter the handler type"
read req
echo "Enter the class to work on "
read class
echo "Enter the function to do "
read func
echo "Enter the json data"
read json
echo "$req is selected"
echo "$req is made"
echo "$func is made"
curl -X $req http://localhost:3000/api/data/$class/$func --cookies "next-auth.session-token=82d616d3-484f-457d-8937-612156439b6b; next-auth.csrf-token=0c51eb405b7bf7541d5bbcd43a974e626e9dee96d8b2e1ac44e350c330be2356%7Ca7e596ddde96c2af34cdc3f64396e6decd471442228e3239cf599176a984e3cc" -d '{}' -H 'Content-Type: application/json' -H 'Accept: application/json'


