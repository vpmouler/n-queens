  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

// makeEmptyMatrix(5)

console.log(_.range(10));


// check stash of iniitl implementaiton of HASANYROWCONFLICTS