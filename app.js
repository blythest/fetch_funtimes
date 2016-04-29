function *pollForTimestamp() {
  while (true) {
    yield fetch('json_dictionary.json', {
      method: 'get'
    }).then(function (d) {
      var json = d.json();
      return json;
    });
  }
}

function runPolling(generator) {
  if (!generator) {
    generator = pollForTimestamp();
  }
  var p = generator.next();
  p.value.then(function (d) {
    if (!d[1].last_modified) {
      runPolling(generator);
    }
    else {
      console.log(d[1].last_modified);
    }
  });
}

window.setInterval(function() { return runPolling()}, 5000);