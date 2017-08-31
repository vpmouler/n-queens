/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  for ( var i = 0; i < n; i++ ) {
    // this.get(i)(col) (x,y) coordinates
    solution.togglePiece(i,i);
    // toggle at above coordinates
    // then check if any conflicts
    // once we have n toggles, return board
  }
  solution = solution.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var flatArray = [];

  if ( n === 1 ) {
    return 1;
  }

  for ( var i = 0; i < n; i++ ) {
    flatArray.push(i);
  }

  var swap = function (array, pos1, pos2) {
    var temp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = temp;
  };

  var heapsPermute = function (array, output, n) {
    n = n || array.length; // set n default to array.length
    if (n === 1) {
      solutionCount++;
    } else {
      for (var i = 1; i <= n; i += 1) {
        heapsPermute(array, output, n - 1);
        if (n % 2) {
          var j = 1;
        } else {
          var j = i;
        }
        swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
      }
    };
  };
  
  heapsPermute(flatArray)

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
    

  var flatArray = [];

  if ( n === 0 || n === 1 ) {
    return 1;
  }

  if ( n === 2 || n === 3) {
    return 0;
  }

  for ( var i = 0; i < n; i++ ) {
    flatArray.push(i);
  }

  var permArray = [];
  var swap = function (array, pos1, pos2) {
    var temp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = temp;
  };

  var heapsPermute = function (array, output, n) {
    n = n || array.length; // set n default to array.length
    if (n === 1) {
      // solutionCount++;
      console.log(array);
      //inside this fn, it doesn't have access to permArray
      console.log('waaait', permArray);
      permArray.concat(array);
    } else {
      for (var d = 1; d <= n; d += 1) {
        heapsPermute(array, output, n - 1);
        if (n % 2) {
          var j = 1;
        } else {
          var j = d;
        }
        swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
      }
    };
  };
  
  heapsPermute(flatArray)

  //go through permarray and take out any that have nums next to each other
  //|i-(i+1)| !=== 0
  // debugger;
  console.log('PA!!!!', permArray);
  var solutionCount = permArray.length;
  // console.log('solutioncount', solutionCount);
  for (var s = 0; s < permArray.length; s++) {
    for (var t = 0 ; t < permArray[s].length - 1; t++) {
      var currentPerm = permArray[s];
      if (Math.abs(currentPerm[t] - currentPerm[t + 1]) === 1) {
        solutionCount--;
        t = permArray[s].length;
      }
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
