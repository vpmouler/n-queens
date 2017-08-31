// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;
      row.forEach(function(item){
        if (item === 1) {
          count++;
        }
      });
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      // var col = this.columns();
      // console.log(col)
      var bool = false;
      for (i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          bool = true;
        }
      }
      return bool;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.get(i)[colIndex] === 1) {
          count++;
        };
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // return bool;
      var columns = [];

      var rows = this.rows();

      rows.forEach(function(row, index) {
        columns[index] = columns[index] || []; //first iteration
        columns[index].push(row[index][index]);
      });

      var bool = false;
      var context = this;
      columns.forEach(function(col, index) {
        if (context.hasColConflictAt(index)) {
          bool = true;
        }
      });
      return bool;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // LOGIC HOLE: KEEP TRACK OF CONFLICTS
      var rows = this.rows();
      var startRow = 1;
      // console.log('majorDiagonalColumnIndexAtFirstRow', majorDiagonalColumnIndexAtFirstRow);
     
      var startCol = parseInt(majorDiagonalColumnIndexAtFirstRow) + 1; // ARGUMENT MAY NOT BE COUNTING INDEX @ 0
      // rows[0][majorDiagonalColumnIndexAtFirstRow] gets us where the 1 is in first row

      // we need to check rows[0+1][majorDiagonalColumnIndexAtFirstRow + 1] 
        // keep checking it until majorDiagonalColumnIndexAtFirstRow >= this.attributes.n (which is how many cols our matrix has)
      var boardSize = this.attributes.n;
      while ( startCol < boardSize && startRow < boardSize) {
        var currentBox = rows[startRow - 1][parseInt(majorDiagonalColumnIndexAtFirstRow)];
        var diagonalFromCurrentBox = rows[startRow][startCol];
        if ( currentBox === 1  &&  diagonalFromCurrentBox === 1 ) { // can put ++ within []
          return true;
        }
        startCol++
        startRow++
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardSize = this.attributes.n;
      //solution for upper left of board
      var startIndex = 0;
      // console.log('THIS', this)
      while ( startIndex < boardSize ) {
        if ( this.hasMajorDiagonalConflictAt(startIndex) ) {
          // console.log('RETURNING TRUE');
          return true;
        }
        startIndex++
      }

      //check lower left
      var rows = this.rows();
      var startRow = 1;
      var startCol = 0; 
      var lowerLeftCount = 0;
      var truthy = false;

      var recurseLowerLeft = function (startRow) {
      debugger;
      //we might be incrementing twice
        while ( startCol < boardSize - 1 && startRow < boardSize - 1) {
          var currentBox = rows[startRow][startCol];
          if (currentBox === 1) {
            lowerLeftCount++;
          }
          var diagonalsFromCurrentBox = rows[startRow + 1][startCol + 1];
          if (diagonalsFromCurrentBox === 1 && lowerLeftCount >= 1) { // can put ++ within []
            truthy = true;
            }
          startCol++;
          recurseLowerLeft(startRow + 1);
          }
      };
      
      recurseLowerLeft(startRow);
      // var currentBox = rows[startRow][startCol];
      // var recurseLowerLeft = function (startRow) {
      //   var conflicts = 0;
      //   //while ( startRow < boardSize ) {
      //   if (startRow === boardSize -1) {
      //     return;
      //   } else {
      //     if ( currentBox === 1 ) {
      //       conflicts++
      //     }
      //     startCol++
      //     startRow++
      //     if ( conflicts > 1 ) {
      //       truthy = true;
      //     }
          
      //   }
      //   recurseLowerLeft(startRow + 1)
      // };
      
      // recurseLowerLeft(startRow);

      return truthy; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //upper left
      var rows = this.rows();
      var startRow = 0;
      var startCol = parseInt(minorDiagonalColumnIndexAtFirstRow);
      var boardSize = this.attributes.n;
      var upperLeftCount = 0;

      // var diagonal = rows[startRow + 1][startRow - 1];

      while (startRow < boardSize && startCol >= 0) {
      var currentBox = rows[startRow][startCol];
        if (currentBox === 1) {
          upperLeftCount++;
        }

        startRow++;
        startCol--;

      }

      return upperLeftCount > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var boardSize = this.attributes.n;


      //check upper left
      for (var i = 0; i < boardSize; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      };


      //recurse lower left
      var startRow = 1;
      var startCol = boardSize - 1;
      var currentBox = rows[startRow][startCol];
      var truthy = false;

      var recurseLowerRight = function(startRow) {
        var conflicts = 0;
        //while ( startRow < boardSize ) {
        if (startRow === boardSize -1) {
          return;
        } else {
          if ( currentBox === 1 ) {
            conflicts++
          }
          startCol--
          startRow++
          if ( conflicts > 1 ) {
            truthy = true;
          }
          
        }
        recurseLowerRight(startRow + 1)
      }



      // var recurseLowerLeft = function(rowIndex) {
      //   // base case
      //   if ( startRow === boardSize ) {
      //     return;
      //   }
      //   // recursive case


      // }



      recurseLowerRight(startRow);


      return truthy;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

var board = new Board({n:4})
