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
  var solutionCount = undefined; //fixme
  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return n;
  }


  var flatArray = _.range(n); //these are all the possible values of a correct solution
  console.log('FLATARRAY HERE!!!!!!', flatArray, n);
  //find all permutations of flatArray
  var permResults = [];

  var permutations = function (flatArray) {
  //loop through flat array
    for (var i=0; i < flatArray.length; i++) {
      // Copy array
      var copy = flatArray;

      // Cut one element from list
      var head = copy.splice(i, 1);
      
      // Permute rest of list
      var rest = permutations(copy);
      
      // Add head to each permutation of rest of list
      // debugger;
      for (var j = 0; j < rest.length; j++) {
        var next = head.concat(rest[j]);
        permResults.push(next);
      }
    }

  }
  permutations(flatArray);





  //return number of permutations/solutions
  solutionCount = permResults.length;

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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
