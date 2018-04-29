// this file is the test and fake code for investigate the mechanism of mongoose query
const query = Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation');

query.getOptions()

// check if the query has already been fetched in redis
// rewrite the function
query.exec = function() {
  const result = client.get('query key')
  if (result) {
    return result
  }

  const result = runtheoriginalqueryfunction()

  client.set('query key', result)

  return result
}

// all method of send query to the mongodb, and get results
query.exec((err, res) => console.log(res))
//same as
query.then(res => console.log(res))
// same as..
const res = await query