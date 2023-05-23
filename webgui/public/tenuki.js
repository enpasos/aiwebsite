/*!
 * Tenuki v0.3.1 (https://github.com/aprescott/tenuki)
 * Copyright © 2016-2019 Adam Prescott.
 * Licensed under the MIT license.
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tenuki=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.Game = require("./lib/game").default;
exports.Client = require("./lib/client").default;
exports.utils = require("./lib/utils").default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImV4cG9ydHMiLCJHYW1lIiwicmVxdWlyZSIsImRlZmF1bHQiLCJDbGllbnQiLCJ1dGlscyJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsUUFBUUMsSUFBUixHQUFlQyxRQUFRLFlBQVIsRUFBc0JDLE9BQXJDO0FBQ0FILFFBQVFJLE1BQVIsR0FBaUJGLFFBQVEsY0FBUixFQUF3QkMsT0FBekM7QUFDQUgsUUFBUUssS0FBUixHQUFnQkgsUUFBUSxhQUFSLEVBQXVCQyxPQUF2QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMuR2FtZSA9IHJlcXVpcmUoXCIuL2xpYi9nYW1lXCIpLmRlZmF1bHQ7XG5leHBvcnRzLkNsaWVudCA9IHJlcXVpcmUoXCIuL2xpYi9jbGllbnRcIikuZGVmYXVsdDtcbmV4cG9ydHMudXRpbHMgPSByZXF1aXJlKFwiLi9saWIvdXRpbHNcIikuZGVmYXVsdDtcbiJdfQ==
},{"./lib/client":3,"./lib/game":6,"./lib/utils":14}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _intersection = require("./intersection");

var _intersection2 = _interopRequireDefault(_intersection);

var _zobrist = require("./zobrist");

var _zobrist2 = _interopRequireDefault(_zobrist);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var BoardState = function BoardState(_ref) {
  var moveNumber = _ref.moveNumber,
      playedPoint = _ref.playedPoint,
      color = _ref.color,
      pass = _ref.pass,
      blackPassStones = _ref.blackPassStones,
      whitePassStones = _ref.whitePassStones,
      intersections = _ref.intersections,
      blackStonesCaptured = _ref.blackStonesCaptured,
      whiteStonesCaptured = _ref.whiteStonesCaptured,
      capturedPositions = _ref.capturedPositions,
      koPoint = _ref.koPoint,
      boardSize = _ref.boardSize,
      labelPoint = _ref.labelPoint,
      labelType = _ref.labelType,
      hidePlayedPoint = _ref.hidePlayedPoint;

  this.moveNumber = moveNumber;
  this.playedPoint = playedPoint;
  this.color = color;
  this.pass = pass;
  this.blackPassStones = blackPassStones;
  this.whitePassStones = whitePassStones;
  this.intersections = intersections;
  this.blackStonesCaptured = blackStonesCaptured;
  this.whiteStonesCaptured = whiteStonesCaptured;
  this.capturedPositions = capturedPositions;
  this.koPoint = koPoint;
  this.boardSize = boardSize;
  this.labelPoint = labelPoint;
  this.labelType = labelType;
  this.hidePlayedPoint = hidePlayedPoint;
  this._positionHash = _zobrist2.default.hash(boardSize, intersections);

  Object.freeze(this);
};

BoardState.prototype = {
  copyWithAttributes: function copyWithAttributes(attrs) {
    var retrieveProperties = function retrieveProperties(_ref2) {
      var moveNumber = _ref2.moveNumber,
          playedPoint = _ref2.playedPoint,
          color = _ref2.color,
          pass = _ref2.pass,
          blackPassStones = _ref2.blackPassStones,
          whitePassStones = _ref2.whitePassStones,
          intersections = _ref2.intersections,
          blackStonesCaptured = _ref2.blackStonesCaptured,
          whiteStonesCaptured = _ref2.whiteStonesCaptured,
          capturedPositions = _ref2.capturedPositions,
          koPoint = _ref2.koPoint,
          boardSize = _ref2.boardSize,
          labelPoint = _ref2.labelPoint,
          labelType = _ref2.labelType,
          hidePlayedPoint = _ref2.hidePlayedPoint;
      return { moveNumber: moveNumber, playedPoint: playedPoint, color: color, pass: pass, blackPassStones: blackPassStones, whitePassStones: whitePassStones, intersections: intersections, blackStonesCaptured: blackStonesCaptured, whiteStonesCaptured: whiteStonesCaptured, capturedPositions: capturedPositions, koPoint: koPoint, boardSize: boardSize, labelPoint: labelPoint, labelType: labelType, hidePlayedPoint: hidePlayedPoint };
    };
    var existingAttrs = retrieveProperties(this);
    var newAttrs = retrieveProperties(Object.assign(existingAttrs, attrs));

    return new BoardState(newAttrs);
  },

  _capturesFrom: function _capturesFrom(y, x, color) {
    var _this = this;

    var capturedNeighbors = this.neighborsFor(y, x).filter(function (neighbor) {
      // TODO: this value of 1 is potentially weird.
      // we're checking against the move before the stone we just played
      // where this space is not occupied yet. things should possibly be
      // reworked.
      return !neighbor.isEmpty() && neighbor.value !== color && _this.libertiesAt(neighbor.y, neighbor.x) === 1;
    });

    var capturedStones = _utils2.default.flatMap(capturedNeighbors, function (neighbor) {
      return _this.groupAt(neighbor.y, neighbor.x);
    });

    return _utils2.default.unique(capturedStones);
  },

  _updateIntersection: function _updateIntersection(intersection, intersections, color, label) {
    return intersections.map(function (i) {
      if (i.y === intersection.y && i.x === intersection.x) {
        return new _intersection2.default(i.y, i.x, color, label);
      } else {
        return i;
      }
    });
  },

  _removeIntersection: function _removeIntersection(intersection, intersections) {
    return this._updateIntersection(intersection, intersections, "empty");
  },

  _withoutIntersectionsMatching: function _withoutIntersectionsMatching(condition) {
    var newPoints = this.intersections.map(function (i) {
      if (condition(i)) {
        return new _intersection2.default(i.y, i.x, "empty");
      } else {
        return i;
      }
    });

    return this._withNewPoints(newPoints);
  },

  _withNewPoints: function _withNewPoints(newPoints) {
    return this.copyWithAttributes({ intersections: newPoints });
  },

  nextColor: function nextColor() {
    if (this.color === "black") {
      return "white";
    } else {
      return "black";
    }
  },

  setColor: function setColor(color) {
    return this.copyWithAttributes({ color: "blackwhite".replace(color, "") });
  },

  yCoordinateFor: function yCoordinateFor(y) {
    return this.boardSize - y;
  },

  xCoordinateFor: function xCoordinateFor(x) {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];

    return letters[x];
  },

  playPass: function playPass(color) {
    var stateInfo = {
      moveNumber: this.moveNumber + 1,
      playedPoint: null,
      color: color,
      pass: true,
      blackPassStones: this.blackPassStones,
      whitePassStones: this.whitePassStones,
      intersections: this.intersections,
      blackStonesCaptured: this.blackStonesCaptured,
      whiteStonesCaptured: this.whiteStonesCaptured,
      capturedPositions: [],
      koPoint: null,
      boardSize: this.boardSize,
      labelPoint: null,
      labelType: null
    };

    stateInfo[color + "PassStones"] += 1;

    var newState = new BoardState(stateInfo);

    return newState;
  },

  _simpleKoPoint: function _simpleKoPoint() {
    var simpleKoPoint = null;

    if (this.playedPoint) {
      var _playedPoint = this.playedPoint,
          y = _playedPoint.y,
          x = _playedPoint.x;

      if (this.capturedPositions.length === 1 && this.groupAt(y, x).length === 1 && this.inAtari(y, x)) {
        simpleKoPoint = this.capturedPositions[0];
      }
    }

    return simpleKoPoint;
  },

  labelAt: function labelAt(y, x, label) {
    var intersection = this.intersectionAt(y, x);
    var newPoints = this.intersections;
    newPoints = this._updateIntersection(intersection, newPoints, intersection.value, label);
    var newState = this.copyWithAttributes({ intersections: newPoints, labelPoint: { y: y, x: x }, labelType: label });
    return newState;
  },

  playAt: function playAt(y, x, playedColor) {
    var _this2 = this;

    var hidePlayedPoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var capturedPositions = this._capturesFrom(y, x, playedColor);
    var playedPoint = this.intersectionAt(y, x);
    var newPoints = this.intersections;

    capturedPositions.forEach(function (i) {
      newPoints = _this2._removeIntersection(i, newPoints);
    });

    newPoints = this._updateIntersection(playedPoint, newPoints, playedColor);

    var newTotalBlackCaptured = this.blackStonesCaptured + (playedColor === "black" ? 0 : capturedPositions.length);
    var newTotalWhiteCaptured = this.whiteStonesCaptured + (playedColor === "white" ? 0 : capturedPositions.length);

    var boardSize = this.boardSize;

    var moveInfo = {
      moveNumber: this.moveNumber + 1,
      playedPoint: Object.freeze({ y: y, x: x }),
      color: playedColor,
      pass: false,
      blackPassStones: this.blackPassStones,
      whitePassStones: this.whitePassStones,
      intersections: newPoints,
      blackStonesCaptured: newTotalBlackCaptured,
      whiteStonesCaptured: newTotalWhiteCaptured,
      capturedPositions: capturedPositions,
      boardSize: boardSize,
      labelPoint: null,
      hidePlayedPoint: hidePlayedPoint
    };

    var withPlayedPoint = new BoardState(moveInfo);

    var possibleKoPoint = withPlayedPoint._simpleKoPoint();

    if (possibleKoPoint) {
      moveInfo["koPoint"] = { y: possibleKoPoint.y, x: possibleKoPoint.x };
    } else {
      moveInfo["koPoint"] = null;
    }

    return new BoardState(moveInfo);
  },

  intersectionAt: function intersectionAt(y, x) {
    if (y >= this.boardSize || x >= this.boardSize) {
      throw new Error("Intersection at (" + y + ", " + x + ") would be outside the board");
    }

    if (y < 0 || x < 0) {
      throw new Error("Intersection position cannot be negative, but was given (" + y + ", " + x + ")");
    }

    return this.intersections[y * this.boardSize + x];
  },

  groupAt: function groupAt(y, x) {
    var startingPoint = this.intersectionAt(y, x);

    var _partitionTraverse = this.partitionTraverse(startingPoint, function (neighbor) {
      return neighbor.sameColorAs(startingPoint);
    }),
        _partitionTraverse2 = _slicedToArray(_partitionTraverse, 2),
        group = _partitionTraverse2[0],
        _ = _partitionTraverse2[1];

    return group;
  },

  libertiesAt: function libertiesAt(y, x) {
    var _this3 = this;

    var point = this.intersectionAt(y, x);

    var emptyPoints = _utils2.default.flatMap(this.groupAt(point.y, point.x), function (groupPoint) {
      return _this3.neighborsFor(groupPoint.y, groupPoint.x).filter(function (intersection) {
        return intersection.isEmpty();
      });
    });

    return _utils2.default.unique(emptyPoints).length;
  },

  inAtari: function inAtari(y, x) {
    return this.libertiesAt(y, x) === 1;
  },

  neighborsFor: function neighborsFor(y, x) {
    var neighbors = [];

    if (x > 0) {
      neighbors.push(this.intersectionAt(y, x - 1));
    }

    if (x < this.boardSize - 1) {
      neighbors.push(this.intersectionAt(y, x + 1));
    }

    if (y > 0) {
      neighbors.push(this.intersectionAt(y - 1, x));
    }

    if (y < this.boardSize - 1) {
      neighbors.push(this.intersectionAt(y + 1, x));
    }

    return neighbors;
  },

  positionSameAs: function positionSameAs(otherState) {
    return this._positionHash === otherState._positionHash && this.intersections.every(function (point) {
      return point.sameColorAs(otherState.intersectionAt(point.y, point.x));
    });
  },

  // Iterative depth-first search traversal. Start from
  // startingPoint, iteratively follow all neighbors.
  // If inclusionConditionis met for a neighbor, include it
  // otherwise, exclude it. At the end, return two arrays:
  // One for the included neighbors, another for the remaining neighbors.
  partitionTraverse: function partitionTraverse(startingPoint, inclusionCondition) {
    var checkedPoints = [];
    var boundaryPoints = [];
    var pointsToCheck = [];

    pointsToCheck.push(startingPoint);

    while (pointsToCheck.length > 0) {
      var point = pointsToCheck.pop();

      if (checkedPoints.indexOf(point) > -1) {
        // skip it, we already checked
      } else {
        checkedPoints.push(point);

        this.neighborsFor(point.y, point.x).forEach(function (neighbor) {
          if (checkedPoints.indexOf(neighbor) > -1) {
            // skip this neighbor, we already checked it
          } else {
            if (inclusionCondition(neighbor)) {
              pointsToCheck.push(neighbor);
            } else {
              boundaryPoints.push(neighbor);
            }
          }
        });
      }
    }

    return [checkedPoints, _utils2.default.unique(boundaryPoints)];
  }
};

BoardState._initialFor = function (boardSize, handicapStones) {
  this._cache = this._cache || {};
  this._cache[boardSize] = this._cache[boardSize] || {};

  if (this._cache[boardSize][handicapStones]) {
    return this._cache[boardSize][handicapStones];
  }

  var emptyPoints = Array.apply(null, Array(boardSize * boardSize));
  emptyPoints = emptyPoints.map(function (x, i) {
    return new _intersection2.default(Math.floor(i / boardSize), i % boardSize);
  });

  var hoshiOffset = boardSize > 11 ? 3 : 2;
  var hoshiPoints = {
    topRight: { y: hoshiOffset, x: boardSize - hoshiOffset - 1 },
    bottomLeft: { y: boardSize - hoshiOffset - 1, x: hoshiOffset },
    bottomRight: { y: boardSize - hoshiOffset - 1, x: boardSize - hoshiOffset - 1 },
    topLeft: { y: hoshiOffset, x: hoshiOffset },
    middle: { y: (boardSize + 1) / 2 - 1, x: (boardSize + 1) / 2 - 1 },
    middleLeft: { y: (boardSize + 1) / 2 - 1, x: hoshiOffset },
    middleRight: { y: (boardSize + 1) / 2 - 1, x: boardSize - hoshiOffset - 1 },
    middleTop: { y: hoshiOffset, x: (boardSize + 1) / 2 - 1 },
    middleBottom: { y: boardSize - hoshiOffset - 1, x: (boardSize + 1) / 2 - 1 }
  };
  var handicapPlacements = {
    0: [],
    1: [],
    2: [hoshiPoints.topRight, hoshiPoints.bottomLeft],
    3: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight],
    4: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft],
    5: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middle],
    6: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight],
    7: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight, hoshiPoints.middle],
    8: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight, hoshiPoints.middleTop, hoshiPoints.middleBottom],
    9: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight, hoshiPoints.middleTop, hoshiPoints.middleBottom, hoshiPoints.middle]
  };

  handicapPlacements[handicapStones].forEach(function (p) {
    emptyPoints[p.y * boardSize + p.x] = new _intersection2.default(p.y, p.x, "black");
  });

  var initialState = new BoardState({
    color: handicapStones > 1 ? "black" : "white",
    moveNumber: 0,
    intersections: Object.freeze(emptyPoints),
    blackStonesCaptured: 0,
    whiteStonesCaptured: 0,
    whitePassStones: 0,
    blackPassStones: 0,
    boardSize: boardSize
  });

  this._cache[boardSize][handicapStones] = initialState;
  return initialState;
};

exports.default = BoardState;

//# sourceMappingURL=board-state.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvYXJkLXN0YXRlLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiYXJyIiwiaSIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJ1bmRlZmluZWQiLCJfaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3MiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJsZW5ndGgiLCJlcnIiLCJBcnJheSIsImlzQXJyYXkiLCJUeXBlRXJyb3IiLCJfdXRpbHMiLCJyZXF1aXJlIiwiX3V0aWxzMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfaW50ZXJzZWN0aW9uIiwiX2ludGVyc2VjdGlvbjIiLCJfem9icmlzdCIsIl96b2JyaXN0MiIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiQm9hcmRTdGF0ZSIsIl9yZWYiLCJtb3ZlTnVtYmVyIiwicGxheWVkUG9pbnQiLCJjb2xvciIsInBhc3MiLCJibGFja1Bhc3NTdG9uZXMiLCJ3aGl0ZVBhc3NTdG9uZXMiLCJpbnRlcnNlY3Rpb25zIiwiYmxhY2tTdG9uZXNDYXB0dXJlZCIsIndoaXRlU3RvbmVzQ2FwdHVyZWQiLCJjYXB0dXJlZFBvc2l0aW9ucyIsImtvUG9pbnQiLCJib2FyZFNpemUiLCJsYWJlbFBvaW50IiwibGFiZWxUeXBlIiwiaGlkZVBsYXllZFBvaW50IiwiX3Bvc2l0aW9uSGFzaCIsImhhc2giLCJmcmVlemUiLCJwcm90b3R5cGUiLCJjb3B5V2l0aEF0dHJpYnV0ZXMiLCJhdHRycyIsInJldHJpZXZlUHJvcGVydGllcyIsIl9yZWYyIiwiZXhpc3RpbmdBdHRycyIsIm5ld0F0dHJzIiwiYXNzaWduIiwiX2NhcHR1cmVzRnJvbSIsInkiLCJ4IiwiX3RoaXMiLCJjYXB0dXJlZE5laWdoYm9ycyIsIm5laWdoYm9yc0ZvciIsImZpbHRlciIsIm5laWdoYm9yIiwiaXNFbXB0eSIsImxpYmVydGllc0F0IiwiY2FwdHVyZWRTdG9uZXMiLCJmbGF0TWFwIiwiZ3JvdXBBdCIsInVuaXF1ZSIsIl91cGRhdGVJbnRlcnNlY3Rpb24iLCJpbnRlcnNlY3Rpb24iLCJsYWJlbCIsIm1hcCIsIl9yZW1vdmVJbnRlcnNlY3Rpb24iLCJfd2l0aG91dEludGVyc2VjdGlvbnNNYXRjaGluZyIsImNvbmRpdGlvbiIsIm5ld1BvaW50cyIsIl93aXRoTmV3UG9pbnRzIiwibmV4dENvbG9yIiwic2V0Q29sb3IiLCJyZXBsYWNlIiwieUNvb3JkaW5hdGVGb3IiLCJ4Q29vcmRpbmF0ZUZvciIsImxldHRlcnMiLCJwbGF5UGFzcyIsInN0YXRlSW5mbyIsIm5ld1N0YXRlIiwiX3NpbXBsZUtvUG9pbnQiLCJzaW1wbGVLb1BvaW50IiwiX3BsYXllZFBvaW50IiwiaW5BdGFyaSIsImxhYmVsQXQiLCJpbnRlcnNlY3Rpb25BdCIsInBsYXlBdCIsInBsYXllZENvbG9yIiwiX3RoaXMyIiwiYXJndW1lbnRzIiwiZm9yRWFjaCIsIm5ld1RvdGFsQmxhY2tDYXB0dXJlZCIsIm5ld1RvdGFsV2hpdGVDYXB0dXJlZCIsIm1vdmVJbmZvIiwid2l0aFBsYXllZFBvaW50IiwicG9zc2libGVLb1BvaW50IiwiRXJyb3IiLCJzdGFydGluZ1BvaW50IiwiX3BhcnRpdGlvblRyYXZlcnNlIiwicGFydGl0aW9uVHJhdmVyc2UiLCJzYW1lQ29sb3JBcyIsIl9wYXJ0aXRpb25UcmF2ZXJzZTIiLCJncm91cCIsIl8iLCJfdGhpczMiLCJwb2ludCIsImVtcHR5UG9pbnRzIiwiZ3JvdXBQb2ludCIsIm5laWdoYm9ycyIsInBvc2l0aW9uU2FtZUFzIiwib3RoZXJTdGF0ZSIsImV2ZXJ5IiwiaW5jbHVzaW9uQ29uZGl0aW9uIiwiY2hlY2tlZFBvaW50cyIsImJvdW5kYXJ5UG9pbnRzIiwicG9pbnRzVG9DaGVjayIsInBvcCIsImluZGV4T2YiLCJfaW5pdGlhbEZvciIsImhhbmRpY2FwU3RvbmVzIiwiX2NhY2hlIiwiYXBwbHkiLCJNYXRoIiwiZmxvb3IiLCJob3NoaU9mZnNldCIsImhvc2hpUG9pbnRzIiwidG9wUmlnaHQiLCJib3R0b21MZWZ0IiwiYm90dG9tUmlnaHQiLCJ0b3BMZWZ0IiwibWlkZGxlIiwibWlkZGxlTGVmdCIsIm1pZGRsZVJpZ2h0IiwibWlkZGxlVG9wIiwibWlkZGxlQm90dG9tIiwiaGFuZGljYXBQbGFjZW1lbnRzIiwicCIsImluaXRpYWxTdGF0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLElBQUlDLGlCQUFpQixZQUFZO0FBQUUsV0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLENBQTVCLEVBQStCO0FBQUUsUUFBSUMsT0FBTyxFQUFYLENBQWUsSUFBSUMsS0FBSyxJQUFULENBQWUsSUFBSUMsS0FBSyxLQUFULENBQWdCLElBQUlDLEtBQUtDLFNBQVQsQ0FBb0IsSUFBSTtBQUFFLFdBQUssSUFBSUMsS0FBS1AsSUFBSVEsT0FBT0MsUUFBWCxHQUFULEVBQWlDQyxFQUF0QyxFQUEwQyxFQUFFUCxLQUFLLENBQUNPLEtBQUtILEdBQUdJLElBQUgsRUFBTixFQUFpQkMsSUFBeEIsQ0FBMUMsRUFBeUVULEtBQUssSUFBOUUsRUFBb0Y7QUFBRUQsYUFBS1csSUFBTCxDQUFVSCxHQUFHYixLQUFiLEVBQXFCLElBQUlJLEtBQUtDLEtBQUtZLE1BQUwsS0FBZ0JiLENBQXpCLEVBQTRCO0FBQVE7QUFBRSxLQUF2SixDQUF3SixPQUFPYyxHQUFQLEVBQVk7QUFBRVgsV0FBSyxJQUFMLENBQVdDLEtBQUtVLEdBQUw7QUFBVyxLQUE1TCxTQUFxTTtBQUFFLFVBQUk7QUFBRSxZQUFJLENBQUNaLEVBQUQsSUFBT0ksR0FBRyxRQUFILENBQVgsRUFBeUJBLEdBQUcsUUFBSDtBQUFpQixPQUFoRCxTQUF5RDtBQUFFLFlBQUlILEVBQUosRUFBUSxNQUFNQyxFQUFOO0FBQVc7QUFBRSxLQUFDLE9BQU9ILElBQVA7QUFBYyxHQUFD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VUFBVThDLENBQVYsRUFBYTtBQUN0RDlCLGdCQUFZOEIsRUFBRXZGLENBQUYsR0FBTWhCLFNBQU4sR0FBa0J1RyxFQUFFdEYsQ0FBaEMsSUFBcUMsSUFBSXBDLGVBQWVLLE9BQW5CLENBQTJCcUgsRUFBRXZGLENBQTdCLEVBQWdDdUYsRUFBRXRGLENBQWxDLEVBQXFDLE9BQXJDLENBQXJDO0FBQ0QsR0FGRDs7QUFJQSxNQUFJdUYsZUFBZSxJQUFJckgsVUFBSixDQUFlO0FBQ2hDSSxXQUFPK0YsaUJBQWlCLENBQWpCLEdBQXFCLE9BQXJCLEdBQStCLE9BRE47QUFFaENqRyxnQkFBWSxDQUZvQjtBQUdoQ00sbUJBQWU1QyxPQUFPdUQsTUFBUCxDQUFjbUUsV0FBZCxDQUhpQjtBQUloQzdFLHlCQUFxQixDQUpXO0FBS2hDQyx5QkFBcUIsQ0FMVztBQU1oQ0gscUJBQWlCLENBTmU7QUFPaENELHFCQUFpQixDQVBlO0FBUWhDTyxlQUFXQTtBQVJxQixHQUFmLENBQW5COztBQVdBLE9BQUt1RixNQUFMLENBQVl2RixTQUFaLEVBQXVCc0YsY0FBdkIsSUFBeUNrQixZQUF6QztBQUNBLFNBQU9BLFlBQVA7QUFDRCxDQXZERDs7QUF5REF2SixRQUFRaUMsT0FBUixHQUFrQkMsVUFBbEI7O0FBRUEiLCJmaWxlIjoiYm9hcmQtc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbnZhciBfdXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHMpO1xuXG52YXIgX2ludGVyc2VjdGlvbiA9IHJlcXVpcmUoXCIuL2ludGVyc2VjdGlvblwiKTtcblxudmFyIF9pbnRlcnNlY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW50ZXJzZWN0aW9uKTtcblxudmFyIF96b2JyaXN0ID0gcmVxdWlyZShcIi4vem9icmlzdFwiKTtcblxudmFyIF96b2JyaXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3pvYnJpc3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgQm9hcmRTdGF0ZSA9IGZ1bmN0aW9uIEJvYXJkU3RhdGUoX3JlZikge1xuICB2YXIgbW92ZU51bWJlciA9IF9yZWYubW92ZU51bWJlcixcbiAgICAgIHBsYXllZFBvaW50ID0gX3JlZi5wbGF5ZWRQb2ludCxcbiAgICAgIGNvbG9yID0gX3JlZi5jb2xvcixcbiAgICAgIHBhc3MgPSBfcmVmLnBhc3MsXG4gICAgICBibGFja1Bhc3NTdG9uZXMgPSBfcmVmLmJsYWNrUGFzc1N0b25lcyxcbiAgICAgIHdoaXRlUGFzc1N0b25lcyA9IF9yZWYud2hpdGVQYXNzU3RvbmVzLFxuICAgICAgaW50ZXJzZWN0aW9ucyA9IF9yZWYuaW50ZXJzZWN0aW9ucyxcbiAgICAgIGJsYWNrU3RvbmVzQ2FwdHVyZWQgPSBfcmVmLmJsYWNrU3RvbmVzQ2FwdHVyZWQsXG4gICAgICB3aGl0ZVN0b25lc0NhcHR1cmVkID0gX3JlZi53aGl0ZVN0b25lc0NhcHR1cmVkLFxuICAgICAgY2FwdHVyZWRQb3NpdGlvbnMgPSBfcmVmLmNhcHR1cmVkUG9zaXRpb25zLFxuICAgICAga29Qb2ludCA9IF9yZWYua29Qb2ludCxcbiAgICAgIGJvYXJkU2l6ZSA9IF9yZWYuYm9hcmRTaXplLFxuICAgICAgbGFiZWxQb2ludCA9IF9yZWYubGFiZWxQb2ludCxcbiAgICAgIGxhYmVsVHlwZSA9IF9yZWYubGFiZWxUeXBlLFxuICAgICAgaGlkZVBsYXllZFBvaW50ID0gX3JlZi5oaWRlUGxheWVkUG9pbnQ7XG5cbiAgdGhpcy5tb3ZlTnVtYmVyID0gbW92ZU51bWJlcjtcbiAgdGhpcy5wbGF5ZWRQb2ludCA9IHBsYXllZFBvaW50O1xuICB0aGlzLmNvbG9yID0gY29sb3I7XG4gIHRoaXMucGFzcyA9IHBhc3M7XG4gIHRoaXMuYmxhY2tQYXNzU3RvbmVzID0gYmxhY2tQYXNzU3RvbmVzO1xuICB0aGlzLndoaXRlUGFzc1N0b25lcyA9IHdoaXRlUGFzc1N0b25lcztcbiAgdGhpcy5pbnRlcnNlY3Rpb25zID0gaW50ZXJzZWN0aW9ucztcbiAgdGhpcy5ibGFja1N0b25lc0NhcHR1cmVkID0gYmxhY2tTdG9uZXNDYXB0dXJlZDtcbiAgdGhpcy53aGl0ZVN0b25lc0NhcHR1cmVkID0gd2hpdGVTdG9uZXNDYXB0dXJlZDtcbiAgdGhpcy5jYXB0dXJlZFBvc2l0aW9ucyA9IGNhcHR1cmVkUG9zaXRpb25zO1xuICB0aGlzLmtvUG9pbnQgPSBrb1BvaW50O1xuICB0aGlzLmJvYXJkU2l6ZSA9IGJvYXJkU2l6ZTtcbiAgdGhpcy5sYWJlbFBvaW50ID0gbGFiZWxQb2ludDtcbiAgdGhpcy5sYWJlbFR5cGUgPSBsYWJlbFR5cGU7XG4gIHRoaXMuaGlkZVBsYXllZFBvaW50ID0gaGlkZVBsYXllZFBvaW50O1xuICB0aGlzLl9wb3NpdGlvbkhhc2ggPSBfem9icmlzdDIuZGVmYXVsdC5oYXNoKGJvYXJkU2l6ZSwgaW50ZXJzZWN0aW9ucyk7XG5cbiAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbn07XG5cbkJvYXJkU3RhdGUucHJvdG90eXBlID0ge1xuICBjb3B5V2l0aEF0dHJpYnV0ZXM6IGZ1bmN0aW9uIGNvcHlXaXRoQXR0cmlidXRlcyhhdHRycykge1xuICAgIHZhciByZXRyaWV2ZVByb3BlcnRpZXMgPSBmdW5jdGlvbiByZXRyaWV2ZVByb3BlcnRpZXMoX3JlZjIpIHtcbiAgICAgIHZhciBtb3ZlTnVtYmVyID0gX3JlZjIubW92ZU51bWJlcixcbiAgICAgICAgICBwbGF5ZWRQb2ludCA9IF9yZWYyLnBsYXllZFBvaW50LFxuICAgICAgICAgIGNvbG9yID0gX3JlZjIuY29sb3IsXG4gICAgICAgICAgcGFzcyA9IF9yZWYyLnBhc3MsXG4gICAgICAgICAgYmxhY2tQYXNzU3RvbmVzID0gX3JlZjIuYmxhY2tQYXNzU3RvbmVzLFxuICAgICAgICAgIHdoaXRlUGFzc1N0b25lcyA9IF9yZWYyLndoaXRlUGFzc1N0b25lcyxcbiAgICAgICAgICBpbnRlcnNlY3Rpb25zID0gX3JlZjIuaW50ZXJzZWN0aW9ucyxcbiAgICAgICAgICBibGFja1N0b25lc0NhcHR1cmVkID0gX3JlZjIuYmxhY2tTdG9uZXNDYXB0dXJlZCxcbiAgICAgICAgICB3aGl0ZVN0b25lc0NhcHR1cmVkID0gX3JlZjIud2hpdGVTdG9uZXNDYXB0dXJlZCxcbiAgICAgICAgICBjYXB0dXJlZFBvc2l0aW9ucyA9IF9yZWYyLmNhcHR1cmVkUG9zaXRpb25zLFxuICAgICAgICAgIGtvUG9pbnQgPSBfcmVmMi5rb1BvaW50LFxuICAgICAgICAgIGJvYXJkU2l6ZSA9IF9yZWYyLmJvYXJkU2l6ZSxcbiAgICAgICAgICBsYWJlbFBvaW50ID0gX3JlZjIubGFiZWxQb2ludCxcbiAgICAgICAgICBsYWJlbFR5cGUgPSBfcmVmMi5sYWJlbFR5cGUsXG4gICAgICAgICAgaGlkZVBsYXllZFBvaW50ID0gX3JlZjIuaGlkZVBsYXllZFBvaW50O1xuICAgICAgcmV0dXJuIHsgbW92ZU51bWJlcjogbW92ZU51bWJlciwgcGxheWVkUG9pbnQ6IHBsYXllZFBvaW50LCBjb2xvcjogY29sb3IsIHBhc3M6IHBhc3MsIGJsYWNrUGFzc1N0b25lczogYmxhY2tQYXNzU3RvbmVzLCB3aGl0ZVBhc3NTdG9uZXM6IHdoaXRlUGFzc1N0b25lcywgaW50ZXJzZWN0aW9uczogaW50ZXJzZWN0aW9ucywgYmxhY2tTdG9uZXNDYXB0dXJlZDogYmxhY2tTdG9uZXNDYXB0dXJlZCwgd2hpdGVTdG9uZXNDYXB0dXJlZDogd2hpdGVTdG9uZXNDYXB0dXJlZCwgY2FwdHVyZWRQb3NpdGlvbnM6IGNhcHR1cmVkUG9zaXRpb25zLCBrb1BvaW50OiBrb1BvaW50LCBib2FyZFNpemU6IGJvYXJkU2l6ZSwgbGFiZWxQb2ludDogbGFiZWxQb2ludCwgbGFiZWxUeXBlOiBsYWJlbFR5cGUsIGhpZGVQbGF5ZWRQb2ludDogaGlkZVBsYXllZFBvaW50IH07XG4gICAgfTtcbiAgICB2YXIgZXhpc3RpbmdBdHRycyA9IHJldHJpZXZlUHJvcGVydGllcyh0aGlzKTtcbiAgICB2YXIgbmV3QXR0cnMgPSByZXRyaWV2ZVByb3BlcnRpZXMoT2JqZWN0LmFzc2lnbihleGlzdGluZ0F0dHJzLCBhdHRycykpO1xuXG4gICAgcmV0dXJuIG5ldyBCb2FyZFN0YXRlKG5ld0F0dHJzKTtcbiAgfSxcblxuICBfY2FwdHVyZXNGcm9tOiBmdW5jdGlvbiBfY2FwdHVyZXNGcm9tKHksIHgsIGNvbG9yKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBjYXB0dXJlZE5laWdoYm9ycyA9IHRoaXMubmVpZ2hib3JzRm9yKHksIHgpLmZpbHRlcihmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgdmFsdWUgb2YgMSBpcyBwb3RlbnRpYWxseSB3ZWlyZC5cbiAgICAgIC8vIHdlJ3JlIGNoZWNraW5nIGFnYWluc3QgdGhlIG1vdmUgYmVmb3JlIHRoZSBzdG9uZSB3ZSBqdXN0IHBsYXllZFxuICAgICAgLy8gd2hlcmUgdGhpcyBzcGFjZSBpcyBub3Qgb2NjdXBpZWQgeWV0LiB0aGluZ3Mgc2hvdWxkIHBvc3NpYmx5IGJlXG4gICAgICAvLyByZXdvcmtlZC5cbiAgICAgIHJldHVybiAhbmVpZ2hib3IuaXNFbXB0eSgpICYmIG5laWdoYm9yLnZhbHVlICE9PSBjb2xvciAmJiBfdGhpcy5saWJlcnRpZXNBdChuZWlnaGJvci55LCBuZWlnaGJvci54KSA9PT0gMTtcbiAgICB9KTtcblxuICAgIHZhciBjYXB0dXJlZFN0b25lcyA9IF91dGlsczIuZGVmYXVsdC5mbGF0TWFwKGNhcHR1cmVkTmVpZ2hib3JzLCBmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgIHJldHVybiBfdGhpcy5ncm91cEF0KG5laWdoYm9yLnksIG5laWdoYm9yLngpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIF91dGlsczIuZGVmYXVsdC51bmlxdWUoY2FwdHVyZWRTdG9uZXMpO1xuICB9LFxuXG4gIF91cGRhdGVJbnRlcnNlY3Rpb246IGZ1bmN0aW9uIF91cGRhdGVJbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uLCBpbnRlcnNlY3Rpb25zLCBjb2xvciwgbGFiZWwpIHtcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9ucy5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIGlmIChpLnkgPT09IGludGVyc2VjdGlvbi55ICYmIGkueCA9PT0gaW50ZXJzZWN0aW9uLngpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBfaW50ZXJzZWN0aW9uMi5kZWZhdWx0KGkueSwgaS54LCBjb2xvciwgbGFiZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgX3JlbW92ZUludGVyc2VjdGlvbjogZnVuY3Rpb24gX3JlbW92ZUludGVyc2VjdGlvbihpbnRlcnNlY3Rpb24sIGludGVyc2VjdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fdXBkYXRlSW50ZXJzZWN0aW9uKGludGVyc2VjdGlvbiwgaW50ZXJzZWN0aW9ucywgXCJlbXB0eVwiKTtcbiAgfSxcblxuICBfd2l0aG91dEludGVyc2VjdGlvbnNNYXRjaGluZzogZnVuY3Rpb24gX3dpdGhvdXRJbnRlcnNlY3Rpb25zTWF0Y2hpbmcoY29uZGl0aW9uKSB7XG4gICAgdmFyIG5ld1BvaW50cyA9IHRoaXMuaW50ZXJzZWN0aW9ucy5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIGlmIChjb25kaXRpb24oaSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBfaW50ZXJzZWN0aW9uMi5kZWZhdWx0KGkueSwgaS54LCBcImVtcHR5XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5fd2l0aE5ld1BvaW50cyhuZXdQb2ludHMpO1xuICB9LFxuXG4gIF93aXRoTmV3UG9pbnRzOiBmdW5jdGlvbiBfd2l0aE5ld1BvaW50cyhuZXdQb2ludHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb3B5V2l0aEF0dHJpYnV0ZXMoeyBpbnRlcnNlY3Rpb25zOiBuZXdQb2ludHMgfSk7XG4gIH0sXG5cbiAgbmV4dENvbG9yOiBmdW5jdGlvbiBuZXh0Q29sb3IoKSB7XG4gICAgaWYgKHRoaXMuY29sb3IgPT09IFwiYmxhY2tcIikge1xuICAgICAgcmV0dXJuIFwid2hpdGVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiYmxhY2tcIjtcbiAgICB9XG4gIH0sXG5cbiAgc2V0Q29sb3I6IGZ1bmN0aW9uIHNldENvbG9yKGNvbG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuY29weVdpdGhBdHRyaWJ1dGVzKHsgY29sb3I6IFwiYmxhY2t3aGl0ZVwiLnJlcGxhY2UoY29sb3IsIFwiXCIpIH0pO1xuICB9LFxuXG4gIHlDb29yZGluYXRlRm9yOiBmdW5jdGlvbiB5Q29vcmRpbmF0ZUZvcih5KSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRTaXplIC0geTtcbiAgfSxcblxuICB4Q29vcmRpbmF0ZUZvcjogZnVuY3Rpb24geENvb3JkaW5hdGVGb3IoeCkge1xuICAgIHZhciBsZXR0ZXJzID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJKXCIsIFwiS1wiLCBcIkxcIiwgXCJNXCIsIFwiTlwiLCBcIk9cIiwgXCJQXCIsIFwiUVwiLCBcIlJcIiwgXCJTXCIsIFwiVFwiXTtcblxuICAgIHJldHVybiBsZXR0ZXJzW3hdO1xuICB9LFxuXG4gIHBsYXlQYXNzOiBmdW5jdGlvbiBwbGF5UGFzcyhjb2xvcikge1xuICAgIHZhciBzdGF0ZUluZm8gPSB7XG4gICAgICBtb3ZlTnVtYmVyOiB0aGlzLm1vdmVOdW1iZXIgKyAxLFxuICAgICAgcGxheWVkUG9pbnQ6IG51bGwsXG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICBwYXNzOiB0cnVlLFxuICAgICAgYmxhY2tQYXNzU3RvbmVzOiB0aGlzLmJsYWNrUGFzc1N0b25lcyxcbiAgICAgIHdoaXRlUGFzc1N0b25lczogdGhpcy53aGl0ZVBhc3NTdG9uZXMsXG4gICAgICBpbnRlcnNlY3Rpb25zOiB0aGlzLmludGVyc2VjdGlvbnMsXG4gICAgICBibGFja1N0b25lc0NhcHR1cmVkOiB0aGlzLmJsYWNrU3RvbmVzQ2FwdHVyZWQsXG4gICAgICB3aGl0ZVN0b25lc0NhcHR1cmVkOiB0aGlzLndoaXRlU3RvbmVzQ2FwdHVyZWQsXG4gICAgICBjYXB0dXJlZFBvc2l0aW9uczogW10sXG4gICAgICBrb1BvaW50OiBudWxsLFxuICAgICAgYm9hcmRTaXplOiB0aGlzLmJvYXJkU2l6ZSxcbiAgICAgIGxhYmVsUG9pbnQ6IG51bGwsXG4gICAgICBsYWJlbFR5cGU6IG51bGxcbiAgICB9O1xuXG4gICAgc3RhdGVJbmZvW2NvbG9yICsgXCJQYXNzU3RvbmVzXCJdICs9IDE7XG5cbiAgICB2YXIgbmV3U3RhdGUgPSBuZXcgQm9hcmRTdGF0ZShzdGF0ZUluZm8pO1xuXG4gICAgcmV0dXJuIG5ld1N0YXRlO1xuICB9LFxuXG4gIF9zaW1wbGVLb1BvaW50OiBmdW5jdGlvbiBfc2ltcGxlS29Qb2ludCgpIHtcbiAgICB2YXIgc2ltcGxlS29Qb2ludCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5wbGF5ZWRQb2ludCkge1xuICAgICAgdmFyIF9wbGF5ZWRQb2ludCA9IHRoaXMucGxheWVkUG9pbnQsXG4gICAgICAgICAgeSA9IF9wbGF5ZWRQb2ludC55LFxuICAgICAgICAgIHggPSBfcGxheWVkUG9pbnQueDtcblxuXG4gICAgICBpZiAodGhpcy5jYXB0dXJlZFBvc2l0aW9ucy5sZW5ndGggPT09IDEgJiYgdGhpcy5ncm91cEF0KHksIHgpLmxlbmd0aCA9PT0gMSAmJiB0aGlzLmluQXRhcmkoeSwgeCkpIHtcbiAgICAgICAgc2ltcGxlS29Qb2ludCA9IHRoaXMuY2FwdHVyZWRQb3NpdGlvbnNbMF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpbXBsZUtvUG9pbnQ7XG4gIH0sXG5cbiAgbGFiZWxBdDogZnVuY3Rpb24gbGFiZWxBdCh5LCB4LCBsYWJlbCkge1xuICAgIHZhciBpbnRlcnNlY3Rpb24gPSB0aGlzLmludGVyc2VjdGlvbkF0KHksIHgpO1xuICAgIHZhciBuZXdQb2ludHMgPSB0aGlzLmludGVyc2VjdGlvbnM7XG4gICAgbmV3UG9pbnRzID0gdGhpcy5fdXBkYXRlSW50ZXJzZWN0aW9uKGludGVyc2VjdGlvbiwgbmV3UG9pbnRzLCBpbnRlcnNlY3Rpb24udmFsdWUsIGxhYmVsKTtcbiAgICB2YXIgbmV3U3RhdGUgPSB0aGlzLmNvcHlXaXRoQXR0cmlidXRlcyh7IGludGVyc2VjdGlvbnM6IG5ld1BvaW50cywgbGFiZWxQb2ludDogeyB5OiB5LCB4OiB4IH0sIGxhYmVsVHlwZTogbGFiZWwgfSk7XG4gICAgcmV0dXJuIG5ld1N0YXRlO1xuICB9LFxuXG4gIHBsYXlBdDogZnVuY3Rpb24gcGxheUF0KHksIHgsIHBsYXllZENvbG9yKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgaGlkZVBsYXllZFBvaW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcblxuICAgIHZhciBjYXB0dXJlZFBvc2l0aW9ucyA9IHRoaXMuX2NhcHR1cmVzRnJvbSh5LCB4LCBwbGF5ZWRDb2xvcik7XG4gICAgdmFyIHBsYXllZFBvaW50ID0gdGhpcy5pbnRlcnNlY3Rpb25BdCh5LCB4KTtcbiAgICB2YXIgbmV3UG9pbnRzID0gdGhpcy5pbnRlcnNlY3Rpb25zO1xuXG4gICAgY2FwdHVyZWRQb3NpdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgbmV3UG9pbnRzID0gX3RoaXMyLl9yZW1vdmVJbnRlcnNlY3Rpb24oaSwgbmV3UG9pbnRzKTtcbiAgICB9KTtcblxuICAgIG5ld1BvaW50cyA9IHRoaXMuX3VwZGF0ZUludGVyc2VjdGlvbihwbGF5ZWRQb2ludCwgbmV3UG9pbnRzLCBwbGF5ZWRDb2xvcik7XG5cbiAgICB2YXIgbmV3VG90YWxCbGFja0NhcHR1cmVkID0gdGhpcy5ibGFja1N0b25lc0NhcHR1cmVkICsgKHBsYXllZENvbG9yID09PSBcImJsYWNrXCIgPyAwIDogY2FwdHVyZWRQb3NpdGlvbnMubGVuZ3RoKTtcbiAgICB2YXIgbmV3VG90YWxXaGl0ZUNhcHR1cmVkID0gdGhpcy53aGl0ZVN0b25lc0NhcHR1cmVkICsgKHBsYXllZENvbG9yID09PSBcIndoaXRlXCIgPyAwIDogY2FwdHVyZWRQb3NpdGlvbnMubGVuZ3RoKTtcblxuICAgIHZhciBib2FyZFNpemUgPSB0aGlzLmJvYXJkU2l6ZTtcblxuICAgIHZhciBtb3ZlSW5mbyA9IHtcbiAgICAgIG1vdmVOdW1iZXI6IHRoaXMubW92ZU51bWJlciArIDEsXG4gICAgICBwbGF5ZWRQb2ludDogT2JqZWN0LmZyZWV6ZSh7IHk6IHksIHg6IHggfSksXG4gICAgICBjb2xvcjogcGxheWVkQ29sb3IsXG4gICAgICBwYXNzOiBmYWxzZSxcbiAgICAgIGJsYWNrUGFzc1N0b25lczogdGhpcy5ibGFja1Bhc3NTdG9uZXMsXG4gICAgICB3aGl0ZVBhc3NTdG9uZXM6IHRoaXMud2hpdGVQYXNzU3RvbmVzLFxuICAgICAgaW50ZXJzZWN0aW9uczogbmV3UG9pbnRzLFxuICAgICAgYmxhY2tTdG9uZXNDYXB0dXJlZDogbmV3VG90YWxCbGFja0NhcHR1cmVkLFxuICAgICAgd2hpdGVTdG9uZXNDYXB0dXJlZDogbmV3VG90YWxXaGl0ZUNhcHR1cmVkLFxuICAgICAgY2FwdHVyZWRQb3NpdGlvbnM6IGNhcHR1cmVkUG9zaXRpb25zLFxuICAgICAgYm9hcmRTaXplOiBib2FyZFNpemUsXG4gICAgICBsYWJlbFBvaW50OiBudWxsLFxuICAgICAgaGlkZVBsYXllZFBvaW50OiBoaWRlUGxheWVkUG9pbnRcbiAgICB9O1xuXG4gICAgdmFyIHdpdGhQbGF5ZWRQb2ludCA9IG5ldyBCb2FyZFN0YXRlKG1vdmVJbmZvKTtcblxuICAgIHZhciBwb3NzaWJsZUtvUG9pbnQgPSB3aXRoUGxheWVkUG9pbnQuX3NpbXBsZUtvUG9pbnQoKTtcblxuICAgIGlmIChwb3NzaWJsZUtvUG9pbnQpIHtcbiAgICAgIG1vdmVJbmZvW1wia29Qb2ludFwiXSA9IHsgeTogcG9zc2libGVLb1BvaW50LnksIHg6IHBvc3NpYmxlS29Qb2ludC54IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vdmVJbmZvW1wia29Qb2ludFwiXSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBCb2FyZFN0YXRlKG1vdmVJbmZvKTtcbiAgfSxcblxuICBpbnRlcnNlY3Rpb25BdDogZnVuY3Rpb24gaW50ZXJzZWN0aW9uQXQoeSwgeCkge1xuICAgIGlmICh5ID49IHRoaXMuYm9hcmRTaXplIHx8IHggPj0gdGhpcy5ib2FyZFNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludGVyc2VjdGlvbiBhdCAoXCIgKyB5ICsgXCIsIFwiICsgeCArIFwiKSB3b3VsZCBiZSBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICB9XG5cbiAgICBpZiAoeSA8IDAgfHwgeCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludGVyc2VjdGlvbiBwb3NpdGlvbiBjYW5ub3QgYmUgbmVnYXRpdmUsIGJ1dCB3YXMgZ2l2ZW4gKFwiICsgeSArIFwiLCBcIiArIHggKyBcIilcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9uc1t5ICogdGhpcy5ib2FyZFNpemUgKyB4XTtcbiAgfSxcblxuICBncm91cEF0OiBmdW5jdGlvbiBncm91cEF0KHksIHgpIHtcbiAgICB2YXIgc3RhcnRpbmdQb2ludCA9IHRoaXMuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG5cbiAgICB2YXIgX3BhcnRpdGlvblRyYXZlcnNlID0gdGhpcy5wYXJ0aXRpb25UcmF2ZXJzZShzdGFydGluZ1BvaW50LCBmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgIHJldHVybiBuZWlnaGJvci5zYW1lQ29sb3JBcyhzdGFydGluZ1BvaW50KTtcbiAgICB9KSxcbiAgICAgICAgX3BhcnRpdGlvblRyYXZlcnNlMiA9IF9zbGljZWRUb0FycmF5KF9wYXJ0aXRpb25UcmF2ZXJzZSwgMiksXG4gICAgICAgIGdyb3VwID0gX3BhcnRpdGlvblRyYXZlcnNlMlswXSxcbiAgICAgICAgXyA9IF9wYXJ0aXRpb25UcmF2ZXJzZTJbMV07XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH0sXG5cbiAgbGliZXJ0aWVzQXQ6IGZ1bmN0aW9uIGxpYmVydGllc0F0KHksIHgpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBwb2ludCA9IHRoaXMuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG5cbiAgICB2YXIgZW1wdHlQb2ludHMgPSBfdXRpbHMyLmRlZmF1bHQuZmxhdE1hcCh0aGlzLmdyb3VwQXQocG9pbnQueSwgcG9pbnQueCksIGZ1bmN0aW9uIChncm91cFBvaW50KSB7XG4gICAgICByZXR1cm4gX3RoaXMzLm5laWdoYm9yc0Zvcihncm91cFBvaW50LnksIGdyb3VwUG9pbnQueCkuZmlsdGVyKGZ1bmN0aW9uIChpbnRlcnNlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbi5pc0VtcHR5KCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBfdXRpbHMyLmRlZmF1bHQudW5pcXVlKGVtcHR5UG9pbnRzKS5sZW5ndGg7XG4gIH0sXG5cbiAgaW5BdGFyaTogZnVuY3Rpb24gaW5BdGFyaSh5LCB4KSB7XG4gICAgcmV0dXJuIHRoaXMubGliZXJ0aWVzQXQoeSwgeCkgPT09IDE7XG4gIH0sXG5cbiAgbmVpZ2hib3JzRm9yOiBmdW5jdGlvbiBuZWlnaGJvcnNGb3IoeSwgeCkge1xuICAgIHZhciBuZWlnaGJvcnMgPSBbXTtcblxuICAgIGlmICh4ID4gMCkge1xuICAgICAgbmVpZ2hib3JzLnB1c2godGhpcy5pbnRlcnNlY3Rpb25BdCh5LCB4IC0gMSkpO1xuICAgIH1cblxuICAgIGlmICh4IDwgdGhpcy5ib2FyZFNpemUgLSAxKSB7XG4gICAgICBuZWlnaGJvcnMucHVzaCh0aGlzLmludGVyc2VjdGlvbkF0KHksIHggKyAxKSk7XG4gICAgfVxuXG4gICAgaWYgKHkgPiAwKSB7XG4gICAgICBuZWlnaGJvcnMucHVzaCh0aGlzLmludGVyc2VjdGlvbkF0KHkgLSAxLCB4KSk7XG4gICAgfVxuXG4gICAgaWYgKHkgPCB0aGlzLmJvYXJkU2l6ZSAtIDEpIHtcbiAgICAgIG5laWdoYm9ycy5wdXNoKHRoaXMuaW50ZXJzZWN0aW9uQXQoeSArIDEsIHgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmVpZ2hib3JzO1xuICB9LFxuXG4gIHBvc2l0aW9uU2FtZUFzOiBmdW5jdGlvbiBwb3NpdGlvblNhbWVBcyhvdGhlclN0YXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSGFzaCA9PT0gb3RoZXJTdGF0ZS5fcG9zaXRpb25IYXNoICYmIHRoaXMuaW50ZXJzZWN0aW9ucy5ldmVyeShmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgIHJldHVybiBwb2ludC5zYW1lQ29sb3JBcyhvdGhlclN0YXRlLmludGVyc2VjdGlvbkF0KHBvaW50LnksIHBvaW50LngpKTtcbiAgICB9KTtcbiAgfSxcblxuICAvLyBJdGVyYXRpdmUgZGVwdGgtZmlyc3Qgc2VhcmNoIHRyYXZlcnNhbC4gU3RhcnQgZnJvbVxuICAvLyBzdGFydGluZ1BvaW50LCBpdGVyYXRpdmVseSBmb2xsb3cgYWxsIG5laWdoYm9ycy5cbiAgLy8gSWYgaW5jbHVzaW9uQ29uZGl0aW9uaXMgbWV0IGZvciBhIG5laWdoYm9yLCBpbmNsdWRlIGl0XG4gIC8vIG90aGVyd2lzZSwgZXhjbHVkZSBpdC4gQXQgdGhlIGVuZCwgcmV0dXJuIHR3byBhcnJheXM6XG4gIC8vIE9uZSBmb3IgdGhlIGluY2x1ZGVkIG5laWdoYm9ycywgYW5vdGhlciBmb3IgdGhlIHJlbWFpbmluZyBuZWlnaGJvcnMuXG4gIHBhcnRpdGlvblRyYXZlcnNlOiBmdW5jdGlvbiBwYXJ0aXRpb25UcmF2ZXJzZShzdGFydGluZ1BvaW50LCBpbmNsdXNpb25Db25kaXRpb24pIHtcbiAgICB2YXIgY2hlY2tlZFBvaW50cyA9IFtdO1xuICAgIHZhciBib3VuZGFyeVBvaW50cyA9IFtdO1xuICAgIHZhciBwb2ludHNUb0NoZWNrID0gW107XG5cbiAgICBwb2ludHNUb0NoZWNrLnB1c2goc3RhcnRpbmdQb2ludCk7XG5cbiAgICB3aGlsZSAocG9pbnRzVG9DaGVjay5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgcG9pbnQgPSBwb2ludHNUb0NoZWNrLnBvcCgpO1xuXG4gICAgICBpZiAoY2hlY2tlZFBvaW50cy5pbmRleE9mKHBvaW50KSA+IC0xKSB7XG4gICAgICAgIC8vIHNraXAgaXQsIHdlIGFscmVhZHkgY2hlY2tlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hlY2tlZFBvaW50cy5wdXNoKHBvaW50KTtcblxuICAgICAgICB0aGlzLm5laWdoYm9yc0Zvcihwb2ludC55LCBwb2ludC54KS5mb3JFYWNoKGZ1bmN0aW9uIChuZWlnaGJvcikge1xuICAgICAgICAgIGlmIChjaGVja2VkUG9pbnRzLmluZGV4T2YobmVpZ2hib3IpID4gLTEpIHtcbiAgICAgICAgICAgIC8vIHNraXAgdGhpcyBuZWlnaGJvciwgd2UgYWxyZWFkeSBjaGVja2VkIGl0XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmNsdXNpb25Db25kaXRpb24obmVpZ2hib3IpKSB7XG4gICAgICAgICAgICAgIHBvaW50c1RvQ2hlY2sucHVzaChuZWlnaGJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBib3VuZGFyeVBvaW50cy5wdXNoKG5laWdoYm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbY2hlY2tlZFBvaW50cywgX3V0aWxzMi5kZWZhdWx0LnVuaXF1ZShib3VuZGFyeVBvaW50cyldO1xuICB9XG59O1xuXG5Cb2FyZFN0YXRlLl9pbml0aWFsRm9yID0gZnVuY3Rpb24gKGJvYXJkU2l6ZSwgaGFuZGljYXBTdG9uZXMpIHtcbiAgdGhpcy5fY2FjaGUgPSB0aGlzLl9jYWNoZSB8fCB7fTtcbiAgdGhpcy5fY2FjaGVbYm9hcmRTaXplXSA9IHRoaXMuX2NhY2hlW2JvYXJkU2l6ZV0gfHwge307XG5cbiAgaWYgKHRoaXMuX2NhY2hlW2JvYXJkU2l6ZV1baGFuZGljYXBTdG9uZXNdKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlW2JvYXJkU2l6ZV1baGFuZGljYXBTdG9uZXNdO1xuICB9XG5cbiAgdmFyIGVtcHR5UG9pbnRzID0gQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkoYm9hcmRTaXplICogYm9hcmRTaXplKSk7XG4gIGVtcHR5UG9pbnRzID0gZW1wdHlQb2ludHMubWFwKGZ1bmN0aW9uICh4LCBpKSB7XG4gICAgcmV0dXJuIG5ldyBfaW50ZXJzZWN0aW9uMi5kZWZhdWx0KE1hdGguZmxvb3IoaSAvIGJvYXJkU2l6ZSksIGkgJSBib2FyZFNpemUpO1xuICB9KTtcblxuICB2YXIgaG9zaGlPZmZzZXQgPSBib2FyZFNpemUgPiAxMSA/IDMgOiAyO1xuICB2YXIgaG9zaGlQb2ludHMgPSB7XG4gICAgdG9wUmlnaHQ6IHsgeTogaG9zaGlPZmZzZXQsIHg6IGJvYXJkU2l6ZSAtIGhvc2hpT2Zmc2V0IC0gMSB9LFxuICAgIGJvdHRvbUxlZnQ6IHsgeTogYm9hcmRTaXplIC0gaG9zaGlPZmZzZXQgLSAxLCB4OiBob3NoaU9mZnNldCB9LFxuICAgIGJvdHRvbVJpZ2h0OiB7IHk6IGJvYXJkU2l6ZSAtIGhvc2hpT2Zmc2V0IC0gMSwgeDogYm9hcmRTaXplIC0gaG9zaGlPZmZzZXQgLSAxIH0sXG4gICAgdG9wTGVmdDogeyB5OiBob3NoaU9mZnNldCwgeDogaG9zaGlPZmZzZXQgfSxcbiAgICBtaWRkbGU6IHsgeTogKGJvYXJkU2l6ZSArIDEpIC8gMiAtIDEsIHg6IChib2FyZFNpemUgKyAxKSAvIDIgLSAxIH0sXG4gICAgbWlkZGxlTGVmdDogeyB5OiAoYm9hcmRTaXplICsgMSkgLyAyIC0gMSwgeDogaG9zaGlPZmZzZXQgfSxcbiAgICBtaWRkbGVSaWdodDogeyB5OiAoYm9hcmRTaXplICsgMSkgLyAyIC0gMSwgeDogYm9hcmRTaXplIC0gaG9zaGlPZmZzZXQgLSAxIH0sXG4gICAgbWlkZGxlVG9wOiB7IHk6IGhvc2hpT2Zmc2V0LCB4OiAoYm9hcmRTaXplICsgMSkgLyAyIC0gMSB9LFxuICAgIG1pZGRsZUJvdHRvbTogeyB5OiBib2FyZFNpemUgLSBob3NoaU9mZnNldCAtIDEsIHg6IChib2FyZFNpemUgKyAxKSAvIDIgLSAxIH1cbiAgfTtcbiAgdmFyIGhhbmRpY2FwUGxhY2VtZW50cyA9IHtcbiAgICAwOiBbXSxcbiAgICAxOiBbXSxcbiAgICAyOiBbaG9zaGlQb2ludHMudG9wUmlnaHQsIGhvc2hpUG9pbnRzLmJvdHRvbUxlZnRdLFxuICAgIDM6IFtob3NoaVBvaW50cy50b3BSaWdodCwgaG9zaGlQb2ludHMuYm90dG9tTGVmdCwgaG9zaGlQb2ludHMuYm90dG9tUmlnaHRdLFxuICAgIDQ6IFtob3NoaVBvaW50cy50b3BSaWdodCwgaG9zaGlQb2ludHMuYm90dG9tTGVmdCwgaG9zaGlQb2ludHMuYm90dG9tUmlnaHQsIGhvc2hpUG9pbnRzLnRvcExlZnRdLFxuICAgIDU6IFtob3NoaVBvaW50cy50b3BSaWdodCwgaG9zaGlQb2ludHMuYm90dG9tTGVmdCwgaG9zaGlQb2ludHMuYm90dG9tUmlnaHQsIGhvc2hpUG9pbnRzLnRvcExlZnQsIGhvc2hpUG9pbnRzLm1pZGRsZV0sXG4gICAgNjogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlUmlnaHRdLFxuICAgIDc6IFtob3NoaVBvaW50cy50b3BSaWdodCwgaG9zaGlQb2ludHMuYm90dG9tTGVmdCwgaG9zaGlQb2ludHMuYm90dG9tUmlnaHQsIGhvc2hpUG9pbnRzLnRvcExlZnQsIGhvc2hpUG9pbnRzLm1pZGRsZUxlZnQsIGhvc2hpUG9pbnRzLm1pZGRsZVJpZ2h0LCBob3NoaVBvaW50cy5taWRkbGVdLFxuICAgIDg6IFtob3NoaVBvaW50cy50b3BSaWdodCwgaG9zaGlQb2ludHMuYm90dG9tTGVmdCwgaG9zaGlQb2ludHMuYm90dG9tUmlnaHQsIGhvc2hpUG9pbnRzLnRvcExlZnQsIGhvc2hpUG9pbnRzLm1pZGRsZUxlZnQsIGhvc2hpUG9pbnRzLm1pZGRsZVJpZ2h0LCBob3NoaVBvaW50cy5taWRkbGVUb3AsIGhvc2hpUG9pbnRzLm1pZGRsZUJvdHRvbV0sXG4gICAgOTogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlUmlnaHQsIGhvc2hpUG9pbnRzLm1pZGRsZVRvcCwgaG9zaGlQb2ludHMubWlkZGxlQm90dG9tLCBob3NoaVBvaW50cy5taWRkbGVdXG4gIH07XG5cbiAgaGFuZGljYXBQbGFjZW1lbnRzW2hhbmRpY2FwU3RvbmVzXS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgZW1wdHlQb2ludHNbcC55ICogYm9hcmRTaXplICsgcC54XSA9IG5ldyBfaW50ZXJzZWN0aW9uMi5kZWZhdWx0KHAueSwgcC54LCBcImJsYWNrXCIpO1xuICB9KTtcblxuICB2YXIgaW5pdGlhbFN0YXRlID0gbmV3IEJvYXJkU3RhdGUoe1xuICAgIGNvbG9yOiBoYW5kaWNhcFN0b25lcyA+IDEgPyBcImJsYWNrXCIgOiBcIndoaXRlXCIsXG4gICAgbW92ZU51bWJlcjogMCxcbiAgICBpbnRlcnNlY3Rpb25zOiBPYmplY3QuZnJlZXplKGVtcHR5UG9pbnRzKSxcbiAgICBibGFja1N0b25lc0NhcHR1cmVkOiAwLFxuICAgIHdoaXRlU3RvbmVzQ2FwdHVyZWQ6IDAsXG4gICAgd2hpdGVQYXNzU3RvbmVzOiAwLFxuICAgIGJsYWNrUGFzc1N0b25lczogMCxcbiAgICBib2FyZFNpemU6IGJvYXJkU2l6ZVxuICB9KTtcblxuICB0aGlzLl9jYWNoZVtib2FyZFNpemVdW2hhbmRpY2FwU3RvbmVzXSA9IGluaXRpYWxTdGF0ZTtcbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEJvYXJkU3RhdGU7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvYXJkLXN0YXRlLmpzLm1hcCJdfQ==
},{"./intersection":7,"./utils":14,"./zobrist":15}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game = require("./game");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

var Client = function Client() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this._boardElement = options["element"];
  this._setup(options);
};

Client.prototype = {
  _setup: function _setup(_ref) {
    var _this = this;

    var player = _ref.player,
        gameOptions = _ref.gameOptions,
        hooks = _ref.hooks;

    this._player = player;
    this._hooks = hooks;

    if (this._player !== "black" && this._player !== "white") {
      throw new Error("Player must be either black or white, but was given: " + this._player);
    }

    gameOptions["_hooks"] = {
      handleClick: function handleClick(y, x) {
        if (_this._busy) {
          return;
        }

        _this._busy = true;

        if (_this.isOver()) {
          var stonesToBeMarkedDead = _this._game.currentState().groupAt(y, x).map(function (i) {
            return {
              y: i.y,
              x: i.x,
              color: i.color
            };
          });

          _this._hooks.submitMarkDeadAt(y, x, stonesToBeMarkedDead, function (result) {
            if (result) {
              _this._game.toggleDeadAt(y, x);
            }

            _this._busy = false;
          });
        } else {
          if (_this._player !== _this.currentPlayer() || _this._game.isIllegalAt(y, x)) {
            _this._busy = false;

            return;
          }

          _this._hooks.submitPlay(y, x, function (result) {
            if (result) {
              _this._game.playAt(y, x);
            }

            _this._busy = false;
          });
        }
      },

      hoverValue: function hoverValue(y, x) {
        if (!_this._busy && _this._player === _this.currentPlayer() && !_this.isOver() && !_this._game.isIllegalAt(y, x)) {
          return _this._player;
        }
      },

      gameIsOver: function gameIsOver() {
        return _this.isOver();
      }
    };

    if (this._boardElement) {
      this._game = new _game2.default(Object.assign({ element: this._boardElement }, gameOptions));
    } else {
      this._game = new (Function.prototype.bind.apply(_game2.default, [null].concat(_toConsumableArray(gameOptions))))();
    }
  },

  isOver: function isOver() {
    return this._game.isOver();
  },

  currentPlayer: function currentPlayer() {
    return this._game.currentPlayer();
  },

  labelAt: function labelAt(y, x, label) {
    this._game.labelAt(y, x, label);
  },

  receivePlay: function receivePlay(y, x) {
    if (this._player === this.currentPlayer()) {
      return;
    }

    this._game.playAt(y, x);
  },

  moveNumber: function moveNumber() {
    return this._game.moveNumber();
  },

  receivePass: function receivePass() {
    if (this._player === this.currentPlayer()) {
      return;
    }

    this._game.pass();
  },

  receiveMarkDeadAt: function receiveMarkDeadAt(y, x) {
    this._game.toggleDeadAt(y, x);
  },

  deadStones: function deadStones() {
    return this._game.deadStones();
  },

  setDeadStones: function setDeadStones(points) {
    this._game._deadPoints = points.map(function (i) {
      return {
        y: i.y,
        x: i.x
      };
    });

    this._game.render();
  },

  pass: function pass() {
    var _this2 = this;

    if (this._busy || this._player !== this.currentPlayer() || this.isOver()) {
      return;
    }

    this._busy = true;

    this._hooks.submitPass(function (result) {
      if (result) {
        _this2._game.pass();
      }

      _this2._busy = false;
    });
  }
};

exports.default = Client;

//# sourceMappingURL=client.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl9nYW1lIiwicmVxdWlyZSIsIl9nYW1lMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImkiLCJhcnIyIiwibGVuZ3RoIiwiZnJvbSIsIkNsaWVudCIsIm9wdGlvbnMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJfYm9hcmRFbGVtZW50IiwiX3NldHVwIiwicHJvdG90eXBlIiwiX3JlZiIsIl90aGlzIiwicGxheWVyIiwiZ2FtZU9wdGlvbnMiLCJob29rcyIsIl9wbGF5ZXIiLCJfaG9va3MiLCJFcnJvciIsImhhbmRsZUNsaWNrIiwieSIsIngiLCJfYnVzeSIsImlzT3ZlciIsInN0b25lc1RvQmVNYXJrZWREZWFkIiwiY3VycmVudFN0YXRlIiwiZ3JvdXBBdCIsIm1hcCIsImNvbG9yIiwic3VibWl0TWFya0RlYWRBdCIsInJlc3VsdCIsInRvZ2dsZURlYWRBdCIsImN1cnJlbnRQbGF5ZXIiLCJpc0lsbGVnYWxBdCIsInN1Ym1pdFBsYXkiLCJwbGF5QXQiLCJob3ZlclZhbHVlIiwiZ2FtZUlzT3ZlciIsImFzc2lnbiIsImVsZW1lbnQiLCJGdW5jdGlvbiIsImJpbmQiLCJhcHBseSIsImNvbmNhdCIsImxhYmVsQXQiLCJsYWJlbCIsInJlY2VpdmVQbGF5IiwibW92ZU51bWJlciIsInJlY2VpdmVQYXNzIiwicGFzcyIsInJlY2VpdmVNYXJrRGVhZEF0IiwiZGVhZFN0b25lcyIsInNldERlYWRTdG9uZXMiLCJwb2ludHMiLCJfZGVhZFBvaW50cyIsInJlbmRlciIsIl90aGlzMiIsInN1Ym1pdFBhc3MiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEv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QThCQyxDQUE5QixFQUFpQztBQUNsRCxTQUFLaEMsS0FBTCxDQUFXMEMsWUFBWCxDQUF3QlgsQ0FBeEIsRUFBMkJDLENBQTNCO0FBQ0QsR0E1R2dCOztBQThHakI4QixjQUFZLFNBQVNBLFVBQVQsR0FBc0I7QUFDaEMsV0FBTyxLQUFLOUQsS0FBTCxDQUFXOEQsVUFBWCxFQUFQO0FBQ0QsR0FoSGdCOztBQWtIakJDLGlCQUFlLFNBQVNBLGFBQVQsQ0FBdUJDLE1BQXZCLEVBQStCO0FBQzVDLFNBQUtoRSxLQUFMLENBQVdpRSxXQUFYLEdBQXlCRCxPQUFPMUIsR0FBUCxDQUFXLFVBQVUzQixDQUFWLEVBQWE7QUFDL0MsYUFBTztBQUNMb0IsV0FBR3BCLEVBQUVvQixDQURBO0FBRUxDLFdBQUdyQixFQUFFcUI7QUFGQSxPQUFQO0FBSUQsS0FMd0IsQ0FBekI7O0FBT0EsU0FBS2hDLEtBQUwsQ0FBV2tFLE1BQVg7QUFDRCxHQTNIZ0I7O0FBNkhqQk4sUUFBTSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLFFBQUlPLFNBQVMsSUFBYjs7QUFFQSxRQUFJLEtBQUtsQyxLQUFMLElBQWMsS0FBS04sT0FBTCxLQUFpQixLQUFLZ0IsYUFBTCxFQUEvQixJQUF1RCxLQUFLVCxNQUFMLEVBQTNELEVBQTBFO0FBQ3hFO0FBQ0Q7O0FBRUQsU0FBS0QsS0FBTCxHQUFhLElBQWI7O0FBRUEsU0FBS0wsTUFBTCxDQUFZd0MsVUFBWixDQUF1QixVQUFVM0IsTUFBVixFQUFrQjtBQUN2QyxVQUFJQSxNQUFKLEVBQVk7QUFDVjBCLGVBQU9uRSxLQUFQLENBQWE0RCxJQUFiO0FBQ0Q7O0FBRURPLGFBQU9sQyxLQUFQLEdBQWUsS0FBZjtBQUNELEtBTkQ7QUFPRDtBQTdJZ0IsQ0FBbkI7O0FBZ0pBbkMsUUFBUVEsT0FBUixHQUFrQlMsTUFBbEI7O0FBRUEiLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XG5cbnZhciBfZ2FtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nYW1lKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbnZhciBDbGllbnQgPSBmdW5jdGlvbiBDbGllbnQoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICB0aGlzLl9ib2FyZEVsZW1lbnQgPSBvcHRpb25zW1wiZWxlbWVudFwiXTtcbiAgdGhpcy5fc2V0dXAob3B0aW9ucyk7XG59O1xuXG5DbGllbnQucHJvdG90eXBlID0ge1xuICBfc2V0dXA6IGZ1bmN0aW9uIF9zZXR1cChfcmVmKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBwbGF5ZXIgPSBfcmVmLnBsYXllcixcbiAgICAgICAgZ2FtZU9wdGlvbnMgPSBfcmVmLmdhbWVPcHRpb25zLFxuICAgICAgICBob29rcyA9IF9yZWYuaG9va3M7XG5cbiAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgdGhpcy5faG9va3MgPSBob29rcztcblxuICAgIGlmICh0aGlzLl9wbGF5ZXIgIT09IFwiYmxhY2tcIiAmJiB0aGlzLl9wbGF5ZXIgIT09IFwid2hpdGVcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIG11c3QgYmUgZWl0aGVyIGJsYWNrIG9yIHdoaXRlLCBidXQgd2FzIGdpdmVuOiBcIiArIHRoaXMuX3BsYXllcik7XG4gICAgfVxuXG4gICAgZ2FtZU9wdGlvbnNbXCJfaG9va3NcIl0gPSB7XG4gICAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gaGFuZGxlQ2xpY2soeSwgeCkge1xuICAgICAgICBpZiAoX3RoaXMuX2J1c3kpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy5fYnVzeSA9IHRydWU7XG5cbiAgICAgICAgaWYgKF90aGlzLmlzT3ZlcigpKSB7XG4gICAgICAgICAgdmFyIHN0b25lc1RvQmVNYXJrZWREZWFkID0gX3RoaXMuX2dhbWUuY3VycmVudFN0YXRlKCkuZ3JvdXBBdCh5LCB4KS5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHk6IGkueSxcbiAgICAgICAgICAgICAgeDogaS54LFxuICAgICAgICAgICAgICBjb2xvcjogaS5jb2xvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIF90aGlzLl9ob29rcy5zdWJtaXRNYXJrRGVhZEF0KHksIHgsIHN0b25lc1RvQmVNYXJrZWREZWFkLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIF90aGlzLl9nYW1lLnRvZ2dsZURlYWRBdCh5LCB4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX3RoaXMuX2J1c3kgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuX3BsYXllciAhPT0gX3RoaXMuY3VycmVudFBsYXllcigpIHx8IF90aGlzLl9nYW1lLmlzSWxsZWdhbEF0KHksIHgpKSB7XG4gICAgICAgICAgICBfdGhpcy5fYnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMuX2hvb2tzLnN1Ym1pdFBsYXkoeSwgeCwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICBfdGhpcy5fZ2FtZS5wbGF5QXQoeSwgeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzLl9idXN5ID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGhvdmVyVmFsdWU6IGZ1bmN0aW9uIGhvdmVyVmFsdWUoeSwgeCkge1xuICAgICAgICBpZiAoIV90aGlzLl9idXN5ICYmIF90aGlzLl9wbGF5ZXIgPT09IF90aGlzLmN1cnJlbnRQbGF5ZXIoKSAmJiAhX3RoaXMuaXNPdmVyKCkgJiYgIV90aGlzLl9nYW1lLmlzSWxsZWdhbEF0KHksIHgpKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLl9wbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGdhbWVJc092ZXI6IGZ1bmN0aW9uIGdhbWVJc092ZXIoKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5pc092ZXIoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuX2JvYXJkRWxlbWVudCkge1xuICAgICAgdGhpcy5fZ2FtZSA9IG5ldyBfZ2FtZTIuZGVmYXVsdChPYmplY3QuYXNzaWduKHsgZWxlbWVudDogdGhpcy5fYm9hcmRFbGVtZW50IH0sIGdhbWVPcHRpb25zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2dhbWUgPSBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KF9nYW1lMi5kZWZhdWx0LCBbbnVsbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShnYW1lT3B0aW9ucykpKSkoKTtcbiAgICB9XG4gIH0sXG5cbiAgaXNPdmVyOiBmdW5jdGlvbiBpc092ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dhbWUuaXNPdmVyKCk7XG4gIH0sXG5cbiAgY3VycmVudFBsYXllcjogZnVuY3Rpb24gY3VycmVudFBsYXllcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2FtZS5jdXJyZW50UGxheWVyKCk7XG4gIH0sXG5cbiAgbGFiZWxBdDogZnVuY3Rpb24gbGFiZWxBdCh5LCB4LCBsYWJlbCkge1xuICAgIHRoaXMuX2dhbWUubGFiZWxBdCh5LCB4LCBsYWJlbCk7XG4gIH0sXG5cbiAgcmVjZWl2ZVBsYXk6IGZ1bmN0aW9uIHJlY2VpdmVQbGF5KHksIHgpIHtcbiAgICBpZiAodGhpcy5fcGxheWVyID09PSB0aGlzLmN1cnJlbnRQbGF5ZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2dhbWUucGxheUF0KHksIHgpO1xuICB9LFxuXG4gIG1vdmVOdW1iZXI6IGZ1bmN0aW9uIG1vdmVOdW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dhbWUubW92ZU51bWJlcigpO1xuICB9LFxuXG4gIHJlY2VpdmVQYXNzOiBmdW5jdGlvbiByZWNlaXZlUGFzcygpIHtcbiAgICBpZiAodGhpcy5fcGxheWVyID09PSB0aGlzLmN1cnJlbnRQbGF5ZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2dhbWUucGFzcygpO1xuICB9LFxuXG4gIHJlY2VpdmVNYXJrRGVhZEF0OiBmdW5jdGlvbiByZWNlaXZlTWFya0RlYWRBdCh5LCB4KSB7XG4gICAgdGhpcy5fZ2FtZS50b2dnbGVEZWFkQXQoeSwgeCk7XG4gIH0sXG5cbiAgZGVhZFN0b25lczogZnVuY3Rpb24gZGVhZFN0b25lcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2FtZS5kZWFkU3RvbmVzKCk7XG4gIH0sXG5cbiAgc2V0RGVhZFN0b25lczogZnVuY3Rpb24gc2V0RGVhZFN0b25lcyhwb2ludHMpIHtcbiAgICB0aGlzLl9nYW1lLl9kZWFkUG9pbnRzID0gcG9pbnRzLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeTogaS55LFxuICAgICAgICB4OiBpLnhcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB0aGlzLl9nYW1lLnJlbmRlcigpO1xuICB9LFxuXG4gIHBhc3M6IGZ1bmN0aW9uIHBhc3MoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5fYnVzeSB8fCB0aGlzLl9wbGF5ZXIgIT09IHRoaXMuY3VycmVudFBsYXllcigpIHx8IHRoaXMuaXNPdmVyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9idXN5ID0gdHJ1ZTtcblxuICAgIHRoaXMuX2hvb2tzLnN1Ym1pdFBhc3MoZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBfdGhpczIuX2dhbWUucGFzcygpO1xuICAgICAgfVxuXG4gICAgICBfdGhpczIuX2J1c3kgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ2xpZW50O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGllbnQuanMubWFwIl19
},{"./game":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _renderer = require("./renderer");

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var DOMRenderer = function DOMRenderer(boardElement, _ref) {
  var hooks = _ref.hooks,
      options = _ref.options;

  _renderer2.default.call(this, boardElement, { hooks: hooks, options: options });

  if (this.smallerStones) {
    _utils2.default.addClass(boardElement, "tenuki-smaller-stones");
  }

  _utils2.default.addClass(boardElement, "tenuki-dom-renderer");
};

DOMRenderer.prototype = Object.create(_renderer2.default.prototype);
DOMRenderer.prototype.constructor = DOMRenderer;

DOMRenderer.prototype._setup = function (boardState) {
  _renderer2.default.prototype._setup.call(this, boardState);

  this.BOARD_LENGTH += 1;
  this.computeSizing();
};

DOMRenderer.prototype.generateBoard = function (boardState) {
  var _this = this;

  var contentsContainer = _utils2.default.createElement("div");

  _utils2.default.appendElement(contentsContainer, _utils2.default.createElement("div", { class: "lines horizontal" }));
  _utils2.default.appendElement(contentsContainer, _utils2.default.createElement("div", { class: "lines vertical" }));
  _utils2.default.appendElement(contentsContainer, _utils2.default.createElement("div", { class: "hoshi-points" }));
  _utils2.default.appendElement(contentsContainer, _utils2.default.createElement("div", { class: "intersections" }));

  _renderer2.default.hoshiPositionsFor(boardState.boardSize).forEach(function (h) {
    var hoshi = _utils2.default.createElement("div", { class: "hoshi" });
    hoshi.style.left = h.left * (_this.INTERSECTION_GAP_SIZE + 1) + "px";
    hoshi.style.top = h.top * (_this.INTERSECTION_GAP_SIZE + 1) + "px";

    _utils2.default.appendElement(contentsContainer.querySelector(".hoshi-points"), hoshi);
  });

  for (var y = 0; y < boardState.boardSize; y++) {
    var horizontalLine = _utils2.default.createElement("div", { class: "line horizontal" });
    horizontalLine.setAttribute("data-left-gutter", boardState.yCoordinateFor(y));
    _utils2.default.appendElement(contentsContainer.querySelector(".lines.horizontal"), horizontalLine);

    var verticalLine = _utils2.default.createElement("div", { class: "line vertical" });
    verticalLine.setAttribute("data-top-gutter", boardState.xCoordinateFor(y));
    _utils2.default.appendElement(contentsContainer.querySelector(".lines.vertical"), verticalLine);

    for (var x = 0; x < boardState.boardSize; x++) {
      var intersectionElement = _utils2.default.createElement("div", { class: "intersection empty" });
      var stoneElement = _utils2.default.createElement("div", { class: "stone" });
      _utils2.default.appendElement(intersectionElement, stoneElement);

      intersectionElement.setAttribute("data-position-x", x);
      intersectionElement.setAttribute("data-position-y", y);

      intersectionElement.style.left = x * (this.INTERSECTION_GAP_SIZE + 1) + "px";
      intersectionElement.style.top = y * (this.INTERSECTION_GAP_SIZE + 1) + "px";

      _utils2.default.appendElement(contentsContainer.querySelector(".intersections"), intersectionElement);

      this.grid[y] = this.grid[y] || [];
      this.grid[y][x] = intersectionElement;

      this.addIntersectionEventListeners(intersectionElement, y, x);
    }
  }

  // prevent the text-selection cursor
  _utils2.default.addEventListener(contentsContainer.querySelector(".lines.horizontal"), "mousedown", function (e) {
    e.preventDefault();
  });
  _utils2.default.addEventListener(contentsContainer.querySelector(".lines.vertical"), "mousedown", function (e) {
    e.preventDefault();
  });

  contentsContainer.querySelector(".lines.horizontal").style.width = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  contentsContainer.querySelector(".lines.horizontal").style.height = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  contentsContainer.querySelector(".lines.vertical").style.width = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  contentsContainer.querySelector(".lines.vertical").style.height = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";

  return contentsContainer;
};

DOMRenderer.prototype.setIntersectionClasses = function (intersectionEl, intersection, classes) {
  if (intersectionEl.className !== classes.join(" ")) {
    intersectionEl.className = classes.join(" ");
  }
};

exports.default = DOMRenderer;

//# sourceMappingURL=dom-renderer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbS1yZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl91dGlscyIsInJlcXVpcmUiLCJfdXRpbHMyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9yZW5kZXJlciIsIl9yZW5kZXJlcjIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIkRPTVJlbmRlcmVyIiwiYm9hcmRFbGVtZW50IiwiX3JlZiIsImhvb2tzIiwib3B0aW9ucyIsImNhbGwiLCJzbWFsbGVyU3RvbmVzIiwiYWRkQ2xhc3MiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsIl9zZXR1cCIsImJvYXJkU3RhdGUiLCJCT0FSRF9MRU5HVEgiLCJjb21wdXRlU2l6aW5nIiwiZ2VuZXJhdGVCb2FyZCIsIl90aGlzIiwiY29udGVudHNDb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kRWxlbWVudCIsImNsYXNzIiwiaG9zaGlQb3NpdGlvbnNGb3IiLCJib2FyZFNpemUiLCJmb3JFYWNoIiwiaCIsImhvc2hpIiwic3R5bGUiLCJsZWZ0IiwiSU5URVJTRUNUSU9OX0dBUF9TSVpFIiwidG9wIiwicXVlcnlTZWxlY3RvciIsInkiLCJob3Jpem9udGFsTGluZSIsInNldEF0dHJpYnV0ZSIsInlDb29yZGluYXRlRm9yIiwidmVydGljYWxMaW5lIiwieENvb3JkaW5hdGVGb3IiLCJ4IiwiaW50ZXJzZWN0aW9uRWxlbWVudCIsInN0b25lRWxlbWVudCIsImdyaWQiLCJhZGRJbnRlcnNlY3Rpb25FdmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ3aWR0aCIsImhlaWdodCIsInNldEludGVyc2VjdGlvbkNsYXNzZXMiLCJpbnRlcnNlY3Rpb25FbCIsImludGVyc2VjdGlvbiIsImNsYXNzZXMiLCJjbGFzc05hbWUiLCJqb2luIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSUMsU0FBU0MsUUFBUSxTQUFSLENBQWI7O0FBRUEsSUFBSUMsVUFBVUMsdUJBQXVCSCxNQUF2QixDQUFkOztBQUVBLElBQUlJLFlBQVlILFFBQVEsWUFBUixDQUFoQjs7QUFFQSxJQUFJSSxhQUFhRix1QkFBdUJDLFNBQXZCLENBQWpCOztBQUVBLFNBQVNELHNCQUFULENBQWdDRyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLE9BQU9BLElBQUlDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCLEVBQUVFLFNBQVNGLEdBQVgsRUFBckM7QUFBd0Q7O0FBRS9GLElBQUlHLGNBQWMsU0FBU0EsV0FBVCxDQUFxQkMsWUFBckIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ3pELE1BQUlDLFFBQVFELEtBQUtDLEtBQWpCO0FBQUEsTUFDSUMsVUFBVUYsS0FBS0UsT0FEbkI7O0FBR0FSLGFBQVdHLE9BQVgsQ0FBbUJNLElBQW5CLENBQXdCLElBQXhCLEVBQThCSixZQUE5QixFQUE0QyxFQUFFRSxPQUFPQSxLQUFULEVBQWdCQyxTQUFTQSxPQUF6QixFQUE1Qzs7QUFFQSxNQUFJLEtBQUtFLGFBQVQsRUFBd0I7QUFDdEJiLFlBQVFNLE9BQVIsQ0FBZ0JRLFFBQWhCLENBQXlCTixZQUF6QixFQUF1Qyx1QkFBdkM7QUFDRDs7QUFFRFIsVUFBUU0sT0FBUixDQUFnQlEsUUFBaEIsQ0FBeUJOLFlBQXpCLEVBQXVDLHFCQUF2QztBQUNELENBWEQ7O0FBYUFELFlBQVlRLFNBQVosR0FBd0JyQixPQUFPc0IsTUFBUCxDQUFjYixXQUFXRyxPQUFYLENBQW1CUyxTQUFqQyxDQUF4QjtBQUNBUixZQUFZUSxTQUFaLENBQXNCRSxXQUF0QixHQUFvQ1YsV0FBcEM7O0FBRUFBLFlBQVlRLFNBQVosQ0FBc0JHLE1BQXRCLEdBQStCLFVBQVVDLFVBQVYsRUFBc0I7QUFDbkRoQixhQUFXRyxPQUFYLENBQW1CUyxTQUFuQixDQUE2QkcsTUFBN0IsQ0FBb0NOLElBQXBDLENBQXlDLElBQXpDLEVBQStDTyxVQUEvQzs7QUFFQSxPQUFLQyxZQUFMLElBQXFCLENBQXJCO0FBQ0EsT0FBS0MsYUFBTDtBQUNELENBTEQ7O0FBT0FkLFlBQVlRLFNBQVosQ0FBc0JPLGFBQXRCLEdBQXNDLFVBQVVILFVBQVYsRUFBc0I7QUFDMUQsTUFBSUksUUFBUSxJQUFaOztBQUVBLE1BQUlDLG9CQUFvQnhCLFFBQVFNLE9BQVIsQ0FBZ0JtQixhQUFoQixDQUE4QixLQUE5QixDQUF4Qjs7QUFFQXpCLFVBQVFNLE9BQVIsQ0FBZ0JvQixhQUFoQixDQUE4QkYsaUJBQTlCLEVBQWlEeEIsUUFBUU0sT0FBUixDQUFnQm1CLGFBQWhCLENBQThCLEtBQTlCLEVBQXFDLEVBQUVFLE9BQU8sa0JBQVQsRUFBckMsQ0FBakQ7QUFDQTNCLFVBQVFNLE9BQVIsQ0FBZ0JvQixhQUFoQixDQUE4QkYsaUJBQTlCLEVBQWlEeEIsUUFBUU0sT0FBUixDQUFnQm1CLGFBQWhCLENBQThCLEtBQTlCLEVBQXFDLEVBQUVFLE9BQU8sZ0JBQVQsRUFBckMsQ0FBakQ7QUFDQTNCLFVBQVFNLE9BQVIsQ0FBZ0JvQixhQUFoQixDQUE4QkYsaUJBQTlCLEVBQWlEeEIsUUFBUU0sT0FBUixDQUFnQm1CLGFBQWhCLENBQThCLEtBQTlCLEVBQXFDLEVBQUVFLE9BQU8sY0FBVCxFQUFyQyxDQUFqRDtBQUNBM0IsVUFBUU0sT0FBUixDQUFnQm9CLGFBQWhCLENBQThCRixpQkFBOUIsRUFBaUR4QixRQUFRTSxPQUFSLENBQWdCbUIsYUFBaEIsQ0FBOEIsS0FBOUIsRUFBcUMsRUFBRUUsT0FBTyxlQUFULEVBQXJDLENBQWpEOztBQUVBeEIsYUFBV0csT0FBWCxDQUFtQnNCLGlCQUFuQixDQUFxQ1QsV0FBV1UsU0FBaEQsRUFBMkRDLE9BQTNELENBQW1FLFVBQVVDLENBQVYsRUFBYTtBQUM5RSxRQUFJQyxRQUFRaEMsUUFBUU0sT0FBUixDQUFnQm1CLGFBQWhCLENBQThCLEtBQTlCLEVBQXFDLEVBQUVFLE9BQU8sT0FBVCxFQUFyQyxDQUFaO0FBQ0FLLFVBQU1DLEtBQU4sQ0FBWUMsSUFBWixHQUFtQkgsRUFBRUcsSUFBRixJQUFVWCxNQUFNWSxxQkFBTixHQUE4QixDQUF4QyxJQUE2QyxJQUFoRTtBQUNBSCxVQUFNQyxLQUFOLENBQVlHLEdBQVosR0FBa0JMLEVBQUVLLEdBQUYsSUFBU2IsTUFBTVkscUJBQU4sR0FBOEIsQ0FBdkMsSUFBNEMsSUFBOUQ7O0FBRUFuQyxZQUFRTSxPQUFSLENBQWdCb0IsYUFBaEIsQ0FBOEJGLGtCQUFrQmEsYUFBbEIsQ0FBZ0MsZUFBaEMsQ0FBOUIsRUFBZ0ZMLEtBQWhGO0FBQ0QsR0FORDs7QUFRQSxPQUFLLElBQUlNLElBQUksQ0FBYixFQUFnQkEsSUFBSW5CLFdBQVdVLFNBQS9CLEVBQTBDUyxHQUExQyxFQUErQztBQUM3QyxRQUFJQyxpQkFBaUJ2QyxRQUFRTSxPQUFSLENBQWdCbUIsYUFBaEIsQ0FBOEIsS0FBOUIsRUFBcUMsRUFBRUUsT0FBTyxpQkFBVCxFQUFyQyxDQUFyQjtBQUNBWSxtQkFBZUMsWUFBZixDQUE0QixrQkFBNUIsRUFBZ0RyQixXQUFXc0IsY0FBWCxDQUEwQkgsQ0FBMUIsQ0FBaEQ7QUFDQXRDLFlBQVFNLE9BQVIsQ0FBZ0JvQixhQUFoQixDQUE4QkYsa0JBQWtCYSxhQUFsQixDQUFnQyxtQkFBaEMsQ0FBOUIsRUFBb0ZFLGNBQXBGOztBQUVBLFFBQUlHLGVBQWUxQyxRQUFRTSxPQUFSLENBQWdCbUIsYUFBaEIsQ0FBOEIsS0FBOUIsRUFBcUMsRUFBRUUsT0FBTyxlQUFULEVBQXJDLENBQW5CO0FBQ0FlLGlCQUFhRixZQUFiLENBQTBCLGlCQUExQixFQUE2Q3JCLFdBQVd3QixjQUFYLENBQTBCTCxDQUExQixDQUE3QztBQUNBdEMsWUFBUU0sT0FBUixDQUFnQm9CLGFBQWhCLENBQThCRixrQkFBa0JhLGFBQWxCLENBQWdDLGlCQUFoQyxDQUE5QixFQUFrRkssWUFBbEY7O0FBRUEsU0FBSyxJQUFJRSxJQUFJLENBQWIsRUFBZ0JBLElBQUl6QixXQUFXVSxTQUEvQixFQUEwQ2UsR0FBMUMsRUFBK0M7QUFDN0MsVUFBSUMsc0JBQXNCN0MsUUFBUU0sT0FBUixDQUFnQm1CLGFBQWhCLENBQThCLEtBQTlCLEVBQXFDLEVBQUVFLE9BQU8sb0JBQVQsRUFBckMsQ0FBMUI7QUFDQSxVQUFJbUIsZUFBZTlDLFFBQVFNLE9BQVIsQ0FBZ0JtQixhQUFoQixDQUE4QixLQUE5QixFQUFxQyxFQUFFRSxPQUFPLE9BQVQsRUFBckMsQ0FBbkI7QUFDQTNCLGNBQVFNLE9BQVIsQ0FBZ0JvQixhQUFoQixDQUE4Qm1CLG1CQUE5QixFQUFtREMsWUFBbkQ7O0FBRUFELDBCQUFvQkwsWUFBcEIsQ0FBaUMsaUJBQWpDLEVBQW9ESSxDQUFwRDtBQUNBQywwQkFBb0JMLFlBQXBCLENBQWlDLGlCQUFqQyxFQUFvREYsQ0FBcEQ7O0FBRUFPLDBCQUFvQlosS0FBcEIsQ0FBMEJDLElBQTFCLEdBQWlDVSxLQUFLLEtBQUtULHFCQUFMLEdBQTZCLENBQWxDLElBQXVDLElBQXhFO0FBQ0FVLDBCQUFvQlosS0FBcEIsQ0FBMEJHLEdBQTFCLEdBQWdDRSxLQUFLLEtBQUtILHFCQUFMLEdBQTZCLENBQWxDLElBQXVDLElBQXZFOztBQUVBbkMsY0FBUU0sT0FBUixDQUFnQm9CLGFBQWhCLENBQThCRixrQkFBa0JhLGFBQWxCLENBQWdDLGdCQUFoQyxDQUE5QixFQUFpRlEsbUJBQWpGOztBQUVBLFdBQUtFLElBQUwsQ0FBVVQsQ0FBVixJQUFlLEtBQUtTLElBQUwsQ0FBVVQsQ0FBVixLQUFnQixFQUEvQjtBQUNBLFdBQUtTLElBQUwsQ0FBVVQsQ0FBVixFQUFhTSxDQUFiLElBQWtCQyxtQkFBbEI7O0FBRUEsV0FBS0csNkJBQUwsQ0FBbUNILG1CQUFuQyxFQUF3RFAsQ0FBeEQsRUFBMkRNLENBQTNEO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBNUMsVUFBUU0sT0FBUixDQUFnQjJDLGdCQUFoQixDQUFpQ3pCLGtCQUFrQmEsYUFBbEIsQ0FBZ0MsbUJBQWhDLENBQWpDLEVBQXVGLFdBQXZGLEVBQW9HLFVBQVVhLENBQVYsRUFBYTtBQUMvR0EsTUFBRUMsY0FBRjtBQUNELEdBRkQ7QUFHQW5ELFVBQVFNLE9BQVIsQ0FBZ0IyQyxnQkFBaEIsQ0FBaUN6QixrQkFBa0JhLGFBQWxCLENBQWdDLGlCQUFoQyxDQUFqQyxFQUFxRixXQUFyRixFQUFrRyxVQUFVYSxDQUFWLEVBQWE7QUFDN0dBLE1BQUVDLGNBQUY7QUFDRCxHQUZEOztBQUlBM0Isb0JBQWtCYSxhQUFsQixDQUFnQyxtQkFBaEMsRUFBcURKLEtBQXJELENBQTJEbUIsS0FBM0QsR0FBbUUsS0FBS2pCLHFCQUFMLElBQThCaEIsV0FBV1UsU0FBWCxHQUF1QixDQUFyRCxJQUEwRFYsV0FBV1UsU0FBckUsR0FBaUYsSUFBcEo7QUFDQUwsb0JBQWtCYSxhQUFsQixDQUFnQyxtQkFBaEMsRUFBcURKLEtBQXJELENBQTJEb0IsTUFBM0QsR0FBb0UsS0FBS2xCLHFCQUFMLElBQThCaEIsV0FBV1UsU0FBWCxHQUF1QixDQUFyRCxJQUEwRFYsV0FBV1UsU0FBckUsR0FBaUYsSUFBcko7QUFDQUwsb0JBQWtCYSxhQUFsQixDQUFnQyxpQkFBaEMsRUFBbURKLEtBQW5ELENBQXlEbUIsS0FBekQsR0FBaUUsS0FBS2pCLHFCQUFMLElBQThCaEIsV0FBV1UsU0FBWCxHQUF1QixDQUFyRCxJQUEwRFYsV0FBV1UsU0FBckUsR0FBaUYsSUFBbEo7QUFDQUwsb0JBQWtCYSxhQUFsQixDQUFnQyxpQkFBaEMsRUFBbURKLEtBQW5ELENBQXlEb0IsTUFBekQsR0FBa0UsS0FBS2xCLHFCQUFMLElBQThCaEIsV0FBV1UsU0FBWCxHQUF1QixDQUFyRCxJQUEwRFYsV0FBV1UsU0FBckUsR0FBaUYsSUFBbko7O0FBRUEsU0FBT0wsaUJBQVA7QUFDRCxDQTdERDs7QUErREFqQixZQUFZUSxTQUFaLENBQXNCdUMsc0JBQXRCLEdBQStDLFVBQVVDLGNBQVYsRUFBMEJDLFlBQTFCLEVBQXdDQyxPQUF4QyxFQUFpRDtBQUM5RixNQUFJRixlQUFlRyxTQUFmLEtBQTZCRCxRQUFRRSxJQUFSLENBQWEsR0FBYixDQUFqQyxFQUFvRDtBQUNsREosbUJBQWVHLFNBQWYsR0FBMkJELFFBQVFFLElBQVIsQ0FBYSxHQUFiLENBQTNCO0FBQ0Q7QUFDRixDQUpEOztBQU1BL0QsUUFBUVUsT0FBUixHQUFrQkMsV0FBbEI7O0FBRUEiLCJmaWxlIjoiZG9tLXJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxudmFyIF91dGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlscyk7XG5cbnZhciBfcmVuZGVyZXIgPSByZXF1aXJlKFwiLi9yZW5kZXJlclwiKTtcblxudmFyIF9yZW5kZXJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZW5kZXJlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBET01SZW5kZXJlciA9IGZ1bmN0aW9uIERPTVJlbmRlcmVyKGJvYXJkRWxlbWVudCwgX3JlZikge1xuICB2YXIgaG9va3MgPSBfcmVmLmhvb2tzLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcblxuICBfcmVuZGVyZXIyLmRlZmF1bHQuY2FsbCh0aGlzLCBib2FyZEVsZW1lbnQsIHsgaG9va3M6IGhvb2tzLCBvcHRpb25zOiBvcHRpb25zIH0pO1xuXG4gIGlmICh0aGlzLnNtYWxsZXJTdG9uZXMpIHtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3MoYm9hcmRFbGVtZW50LCBcInRlbnVraS1zbWFsbGVyLXN0b25lc1wiKTtcbiAgfVxuXG4gIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWRvbS1yZW5kZXJlclwiKTtcbn07XG5cbkRPTVJlbmRlcmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoX3JlbmRlcmVyMi5kZWZhdWx0LnByb3RvdHlwZSk7XG5ET01SZW5kZXJlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBET01SZW5kZXJlcjtcblxuRE9NUmVuZGVyZXIucHJvdG90eXBlLl9zZXR1cCA9IGZ1bmN0aW9uIChib2FyZFN0YXRlKSB7XG4gIF9yZW5kZXJlcjIuZGVmYXVsdC5wcm90b3R5cGUuX3NldHVwLmNhbGwodGhpcywgYm9hcmRTdGF0ZSk7XG5cbiAgdGhpcy5CT0FSRF9MRU5HVEggKz0gMTtcbiAgdGhpcy5jb21wdXRlU2l6aW5nKCk7XG59O1xuXG5ET01SZW5kZXJlci5wcm90b3R5cGUuZ2VuZXJhdGVCb2FyZCA9IGZ1bmN0aW9uIChib2FyZFN0YXRlKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIGNvbnRlbnRzQ29udGFpbmVyID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwibGluZXMgaG9yaXpvbnRhbFwiIH0pKTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwibGluZXMgdmVydGljYWxcIiB9KSk7XG4gIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImhvc2hpLXBvaW50c1wiIH0pKTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaW50ZXJzZWN0aW9uc1wiIH0pKTtcblxuICBfcmVuZGVyZXIyLmRlZmF1bHQuaG9zaGlQb3NpdGlvbnNGb3IoYm9hcmRTdGF0ZS5ib2FyZFNpemUpLmZvckVhY2goZnVuY3Rpb24gKGgpIHtcbiAgICB2YXIgaG9zaGkgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImhvc2hpXCIgfSk7XG4gICAgaG9zaGkuc3R5bGUubGVmdCA9IGgubGVmdCAqIChfdGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSArIFwicHhcIjtcbiAgICBob3NoaS5zdHlsZS50b3AgPSBoLnRvcCAqIChfdGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSArIFwicHhcIjtcblxuICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuaG9zaGktcG9pbnRzXCIpLCBob3NoaSk7XG4gIH0pO1xuXG4gIGZvciAodmFyIHkgPSAwOyB5IDwgYm9hcmRTdGF0ZS5ib2FyZFNpemU7IHkrKykge1xuICAgIHZhciBob3Jpem9udGFsTGluZSA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwibGluZSBob3Jpem9udGFsXCIgfSk7XG4gICAgaG9yaXpvbnRhbExpbmUuc2V0QXR0cmlidXRlKFwiZGF0YS1sZWZ0LWd1dHRlclwiLCBib2FyZFN0YXRlLnlDb29yZGluYXRlRm9yKHkpKTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChjb250ZW50c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmxpbmVzLmhvcml6b250YWxcIiksIGhvcml6b250YWxMaW5lKTtcblxuICAgIHZhciB2ZXJ0aWNhbExpbmUgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImxpbmUgdmVydGljYWxcIiB9KTtcbiAgICB2ZXJ0aWNhbExpbmUuc2V0QXR0cmlidXRlKFwiZGF0YS10b3AtZ3V0dGVyXCIsIGJvYXJkU3RhdGUueENvb3JkaW5hdGVGb3IoeSkpO1xuICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMudmVydGljYWxcIiksIHZlcnRpY2FsTGluZSk7XG5cbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGJvYXJkU3RhdGUuYm9hcmRTaXplOyB4KyspIHtcbiAgICAgIHZhciBpbnRlcnNlY3Rpb25FbGVtZW50ID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJpbnRlcnNlY3Rpb24gZW1wdHlcIiB9KTtcbiAgICAgIHZhciBzdG9uZUVsZW1lbnQgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInN0b25lXCIgfSk7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25FbGVtZW50LCBzdG9uZUVsZW1lbnQpO1xuXG4gICAgICBpbnRlcnNlY3Rpb25FbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb24teFwiLCB4KTtcbiAgICAgIGludGVyc2VjdGlvbkVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvbi15XCIsIHkpO1xuXG4gICAgICBpbnRlcnNlY3Rpb25FbGVtZW50LnN0eWxlLmxlZnQgPSB4ICogKHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgKyBcInB4XCI7XG4gICAgICBpbnRlcnNlY3Rpb25FbGVtZW50LnN0eWxlLnRvcCA9IHkgKiAodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSArIFwicHhcIjtcblxuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5pbnRlcnNlY3Rpb25zXCIpLCBpbnRlcnNlY3Rpb25FbGVtZW50KTtcblxuICAgICAgdGhpcy5ncmlkW3ldID0gdGhpcy5ncmlkW3ldIHx8IFtdO1xuICAgICAgdGhpcy5ncmlkW3ldW3hdID0gaW50ZXJzZWN0aW9uRWxlbWVudDtcblxuICAgICAgdGhpcy5hZGRJbnRlcnNlY3Rpb25FdmVudExpc3RlbmVycyhpbnRlcnNlY3Rpb25FbGVtZW50LCB5LCB4KTtcbiAgICB9XG4gIH1cblxuICAvLyBwcmV2ZW50IHRoZSB0ZXh0LXNlbGVjdGlvbiBjdXJzb3JcbiAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIoY29udGVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5saW5lcy5ob3Jpem9udGFsXCIpLCBcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG4gIF91dGlsczIuZGVmYXVsdC5hZGRFdmVudExpc3RlbmVyKGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMudmVydGljYWxcIiksIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICBjb250ZW50c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmxpbmVzLmhvcml6b250YWxcIikuc3R5bGUud2lkdGggPSB0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSAqIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpICsgYm9hcmRTdGF0ZS5ib2FyZFNpemUgKyBcInB4XCI7XG4gIGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMuaG9yaXpvbnRhbFwiKS5zdHlsZS5oZWlnaHQgPSB0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSAqIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpICsgYm9hcmRTdGF0ZS5ib2FyZFNpemUgKyBcInB4XCI7XG4gIGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMudmVydGljYWxcIikuc3R5bGUud2lkdGggPSB0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSAqIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpICsgYm9hcmRTdGF0ZS5ib2FyZFNpemUgKyBcInB4XCI7XG4gIGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMudmVydGljYWxcIikuc3R5bGUuaGVpZ2h0ID0gdGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKiAoYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxKSArIGJvYXJkU3RhdGUuYm9hcmRTaXplICsgXCJweFwiO1xuXG4gIHJldHVybiBjb250ZW50c0NvbnRhaW5lcjtcbn07XG5cbkRPTVJlbmRlcmVyLnByb3RvdHlwZS5zZXRJbnRlcnNlY3Rpb25DbGFzc2VzID0gZnVuY3Rpb24gKGludGVyc2VjdGlvbkVsLCBpbnRlcnNlY3Rpb24sIGNsYXNzZXMpIHtcbiAgaWYgKGludGVyc2VjdGlvbkVsLmNsYXNzTmFtZSAhPT0gY2xhc3Nlcy5qb2luKFwiIFwiKSkge1xuICAgIGludGVyc2VjdGlvbkVsLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIik7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERPTVJlbmRlcmVyO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb20tcmVuZGVyZXIuanMubWFwIl19
},{"./renderer":10,"./utils":14}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EyePoint = function EyePoint(boardState, intersection) {
  this.boardState = boardState;
  this.intersection = intersection;

  Object.freeze(this);
};

EyePoint.prototype = {
  diagonals: function diagonals() {
    var _this = this;

    var diagonals = [];

    var possibleX = [];
    var possibleY = [];

    if (this.intersection.x > 0) {
      possibleX.push(this.intersection.x - 1);
    }

    if (this.intersection.x < this.boardState.boardSize - 1) {
      possibleX.push(this.intersection.x + 1);
    }

    if (this.intersection.y > 0) {
      possibleY.push(this.intersection.y - 1);
    }

    if (this.intersection.y < this.boardState.boardSize - 1) {
      possibleY.push(this.intersection.y + 1);
    }

    possibleX.forEach(function (x) {
      possibleY.forEach(function (y) {
        diagonals.push(_this.boardState.intersectionAt(y, x));
      });
    });

    return diagonals;
  },

  isFalse: function isFalse() {
    if (!this.intersection.isEmpty()) {
      return false;
    }

    var diagonals = this.diagonals();
    var onFirstLine = diagonals.length <= 2;

    var neighbors = this.neighbors();
    var occupiedNeighbors = neighbors.filter(function (i) {
      return !i.isEmpty();
    });

    if (onFirstLine && occupiedNeighbors.length < 1) {
      return false;
    }

    if (!onFirstLine && occupiedNeighbors.length < 2) {
      return false;
    }

    var opposingOccupiedDiagonals = diagonals.filter(function (d) {
      return !d.isEmpty() && !d.sameColorAs(occupiedNeighbors[0]);
    });

    if (onFirstLine) {
      return opposingOccupiedDiagonals.length >= 1;
    } else {
      return opposingOccupiedDiagonals.length >= 2;
    }
  },

  neighbors: function neighbors() {
    return this.boardState.neighborsFor(this.intersection.y, this.intersection.x);
  },

  filledColor: function filledColor() {
    if (!this.isFalse()) {
      throw new Error("Attempting to find filled color for a non-false eye");
    }

    return this.neighbors()[0].value;
  }
};

exports.default = EyePoint;

//# sourceMappingURL=eye-point.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV5ZS1wb2ludC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIkV5ZVBvaW50IiwiYm9hcmRTdGF0ZSIsImludGVyc2VjdGlvbiIsImZyZWV6ZSIsInByb3RvdHlwZSIsImRpYWdvbmFscyIsIl90aGlzIiwicG9zc2libGVYIiwicG9zc2libGVZIiwieCIsInB1c2giLCJib2FyZFNpemUiLCJ5IiwiZm9yRWFjaCIsImludGVyc2VjdGlvbkF0IiwiaXNGYWxzZSIsImlzRW1wdHkiLCJvbkZpcnN0TGluZSIsImxlbmd0aCIsIm5laWdoYm9ycyIsIm9jY3VwaWVkTmVpZ2hib3JzIiwiZmlsdGVyIiwiaSIsIm9wcG9zaW5nT2NjdXBpZWREaWFnb25hbHMiLCJkIiwic2FtZUNvbG9yQXMiLCJuZWlnaGJvcnNGb3IiLCJmaWxsZWRDb2xvciIsIkVycm9yIiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsSUFBSUMsV0FBVyxTQUFTQSxRQUFULENBQWtCQyxVQUFsQixFQUE4QkMsWUFBOUIsRUFBNEM7QUFDekQsT0FBS0QsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxPQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjs7QUFFQU4sU0FBT08sTUFBUCxDQUFjLElBQWQ7QUFDRCxDQUxEOztBQU9BSCxTQUFTSSxTQUFULEdBQXFCO0FBQ25CQyxhQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsUUFBSUMsUUFBUSxJQUFaOztBQUVBLFFBQUlELFlBQVksRUFBaEI7O0FBRUEsUUFBSUUsWUFBWSxFQUFoQjtBQUNBLFFBQUlDLFlBQVksRUFBaEI7O0FBRUEsUUFBSSxLQUFLTixZQUFMLENBQWtCTyxDQUFsQixHQUFzQixDQUExQixFQUE2QjtBQUMzQkYsZ0JBQVVHLElBQVYsQ0FBZSxL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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgRXllUG9pbnQgPSBmdW5jdGlvbiBFeWVQb2ludChib2FyZFN0YXRlLCBpbnRlcnNlY3Rpb24pIHtcbiAgdGhpcy5ib2FyZFN0YXRlID0gYm9hcmRTdGF0ZTtcbiAgdGhpcy5pbnRlcnNlY3Rpb24gPSBpbnRlcnNlY3Rpb247XG5cbiAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbn07XG5cbkV5ZVBvaW50LnByb3RvdHlwZSA9IHtcbiAgZGlhZ29uYWxzOiBmdW5jdGlvbiBkaWFnb25hbHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBkaWFnb25hbHMgPSBbXTtcblxuICAgIHZhciBwb3NzaWJsZVggPSBbXTtcbiAgICB2YXIgcG9zc2libGVZID0gW107XG5cbiAgICBpZiAodGhpcy5pbnRlcnNlY3Rpb24ueCA+IDApIHtcbiAgICAgIHBvc3NpYmxlWC5wdXNoKHRoaXMuaW50ZXJzZWN0aW9uLnggLSAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbnRlcnNlY3Rpb24ueCA8IHRoaXMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxKSB7XG4gICAgICBwb3NzaWJsZVgucHVzaCh0aGlzLmludGVyc2VjdGlvbi54ICsgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW50ZXJzZWN0aW9uLnkgPiAwKSB7XG4gICAgICBwb3NzaWJsZVkucHVzaCh0aGlzLmludGVyc2VjdGlvbi55IC0gMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW50ZXJzZWN0aW9uLnkgPCB0aGlzLmJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMSkge1xuICAgICAgcG9zc2libGVZLnB1c2godGhpcy5pbnRlcnNlY3Rpb24ueSArIDEpO1xuICAgIH1cblxuICAgIHBvc3NpYmxlWC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XG4gICAgICBwb3NzaWJsZVkuZm9yRWFjaChmdW5jdGlvbiAoeSkge1xuICAgICAgICBkaWFnb25hbHMucHVzaChfdGhpcy5ib2FyZFN0YXRlLmludGVyc2VjdGlvbkF0KHksIHgpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpYWdvbmFscztcbiAgfSxcblxuICBpc0ZhbHNlOiBmdW5jdGlvbiBpc0ZhbHNlKCkge1xuICAgIGlmICghdGhpcy5pbnRlcnNlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGRpYWdvbmFscyA9IHRoaXMuZGlhZ29uYWxzKCk7XG4gICAgdmFyIG9uRmlyc3RMaW5lID0gZGlhZ29uYWxzLmxlbmd0aCA8PSAyO1xuXG4gICAgdmFyIG5laWdoYm9ycyA9IHRoaXMubmVpZ2hib3JzKCk7XG4gICAgdmFyIG9jY3VwaWVkTmVpZ2hib3JzID0gbmVpZ2hib3JzLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuICFpLmlzRW1wdHkoKTtcbiAgICB9KTtcblxuICAgIGlmIChvbkZpcnN0TGluZSAmJiBvY2N1cGllZE5laWdoYm9ycy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFvbkZpcnN0TGluZSAmJiBvY2N1cGllZE5laWdoYm9ycy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wcG9zaW5nT2NjdXBpZWREaWFnb25hbHMgPSBkaWFnb25hbHMuZmlsdGVyKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gIWQuaXNFbXB0eSgpICYmICFkLnNhbWVDb2xvckFzKG9jY3VwaWVkTmVpZ2hib3JzWzBdKTtcbiAgICB9KTtcblxuICAgIGlmIChvbkZpcnN0TGluZSkge1xuICAgICAgcmV0dXJuIG9wcG9zaW5nT2NjdXBpZWREaWFnb25hbHMubGVuZ3RoID49IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHBvc2luZ09jY3VwaWVkRGlhZ29uYWxzLmxlbmd0aCA+PSAyO1xuICAgIH1cbiAgfSxcblxuICBuZWlnaGJvcnM6IGZ1bmN0aW9uIG5laWdoYm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZFN0YXRlLm5laWdoYm9yc0Zvcih0aGlzLmludGVyc2VjdGlvbi55LCB0aGlzLmludGVyc2VjdGlvbi54KTtcbiAgfSxcblxuICBmaWxsZWRDb2xvcjogZnVuY3Rpb24gZmlsbGVkQ29sb3IoKSB7XG4gICAgaWYgKCF0aGlzLmlzRmFsc2UoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXR0ZW1wdGluZyB0byBmaW5kIGZpbGxlZCBjb2xvciBmb3IgYSBub24tZmFsc2UgZXllXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5laWdoYm9ycygpWzBdLnZhbHVlO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFeWVQb2ludDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXllLXBvaW50LmpzLm1hcCJdfQ==
},{}],6:[function(require,module,exports){
"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _domRenderer = require("./dom-renderer");

var _domRenderer2 = _interopRequireDefault(_domRenderer);

var _svgRenderer = require("./svg-renderer");

var _svgRenderer2 = _interopRequireDefault(_svgRenderer);

var _nullRenderer = require("./null-renderer");

var _nullRenderer2 = _interopRequireDefault(_nullRenderer);

var _boardState = require("./board-state");

var _boardState2 = _interopRequireDefault(_boardState);

var _ruleset = require("./ruleset");

var _ruleset2 = _interopRequireDefault(_ruleset);

var _scorer = require("./scorer");

var _scorer2 = _interopRequireDefault(_scorer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var VALID_GAME_OPTIONS = ["element", "boardSize", "scoring", "handicapStones", "koRule", "komi", "_hooks", "fuzzyStonePlacement", "renderer", "freeHandicapPlacement"];

var Game = function Game() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this._validateOptions(options);

  this._defaultBoardSize = 19;
  this.boardSize = null;
  this._moves = [];
  this.callbacks = {
    postRender: function postRender() {},
    postMove: function postMove() {} // arg: currentPlayer, isPass
  };
  this._boardElement = options["element"];
  this._defaultScoring = "territory";
  this._defaultKoRule = "simple";
  this._defaultRenderer = "svg";
  this._deadPoints = [];

  this._setup(options);
};

Game.prototype = {
  _validateOptions: function _validateOptions(options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        if (VALID_GAME_OPTIONS.indexOf(key) < 0) {
          throw new Error("Unrecognized game option: " + key);
        }

        if (typeof options[key] === "undefined" || options[key] === null) {
          throw new Error("Game option " + key + " must not be set as null or undefined");
        }
      }
    }
  },

  _configureOptions: function _configureOptions() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$boardSize = _ref.boardSize,
        boardSize = _ref$boardSize === undefined ? this._defaultBoardSize : _ref$boardSize,
        _ref$komi = _ref.komi,
        komi = _ref$komi === undefined ? 0 : _ref$komi,
        _ref$handicapStones = _ref.handicapStones,
        handicapStones = _ref$handicapStones === undefined ? 0 : _ref$handicapStones,
        _ref$freeHandicapPlac = _ref.freeHandicapPlacement,
        freeHandicapPlacement = _ref$freeHandicapPlac === undefined ? false : _ref$freeHandicapPlac,
        _ref$scoring = _ref.scoring,
        scoring = _ref$scoring === undefined ? this._defaultScoring : _ref$scoring,
        _ref$koRule = _ref.koRule,
        koRule = _ref$koRule === undefined ? this._defaultKoRule : _ref$koRule,
        _ref$renderer = _ref.renderer,
        renderer = _ref$renderer === undefined ? this._defaultRenderer : _ref$renderer;

    if (typeof boardSize !== "number") {
      throw new Error("Board size must be a number, but was: " + (typeof boardSize === "undefined" ? "undefined" : _typeof(boardSize)));
    }

    if (typeof handicapStones !== "number") {
      throw new Error("Handicap stones must be a number, but was: " + (typeof boardSize === "undefined" ? "undefined" : _typeof(boardSize)));
    }

    if (handicapStones > 0 && boardSize !== 9 && boardSize !== 13 && boardSize !== 19) {
      throw new Error("Handicap stones not supported on sizes other than 9x9, 13x13 and 19x19");
    }

    if (handicapStones < 0 || handicapStones === 1 || handicapStones > 9) {
      throw new Error("Only 2 to 9 handicap stones are supported");
    }

    if (boardSize > 19) {
      throw new Error("cannot generate a board size greater than 19");
    }

    this.boardSize = boardSize;
    this.handicapStones = handicapStones;
    this._freeHandicapPlacement = freeHandicapPlacement;

    this._scorer = new _scorer2.default({
      scoreBy: scoring,
      komi: komi
    });

    this._rendererChoice = {
      "dom": _domRenderer2.default,
      "svg": _svgRenderer2.default
    }[renderer];

    if (!this._rendererChoice) {
      throw new Error("Unknown renderer: " + renderer);
    }

    this._ruleset = new _ruleset2.default({
      koRule: koRule
    });

    if (this._freeHandicapPlacement) {
      this._initialState = _boardState2.default._initialFor(boardSize, 0);
    } else {
      this._initialState = _boardState2.default._initialFor(boardSize, handicapStones);
    }
  },

  _stillPlayingHandicapStones: function _stillPlayingHandicapStones() {
    return this._freeHandicapPlacement && this.handicapStones > 0 && this._moves.length < this.handicapStones;
  },

  _setup: function _setup() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._validateOptions(options);
    this._configureOptions(options);

    if (this._boardElement) {
      var defaultRendererHooks = {
        handleClick: function handleClick(y, x) {
          if (_this.isOver()) {
            _this.toggleDeadAt(y, x);
          } else {
            _this.playAt(y, x);
          }
        },

        hoverValue: function hoverValue(y, x) {
          if (!_this.isOver() && !_this.isIllegalAt(y, x)) {
            return _this.currentPlayer();
          }
        },

        gameIsOver: function gameIsOver() {
          return _this.isOver();
        }
      };

      this.renderer = new this._rendererChoice(this._boardElement, {
        hooks: options["_hooks"] || defaultRendererHooks,
        options: {
          fuzzyStonePlacement: options["fuzzyStonePlacement"]
        }
      });
    } else {
      this.renderer = new _nullRenderer2.default();
    }

    this.render();
  },

  intersectionAt: function intersectionAt(y, x) {
    return this.currentState().intersectionAt(y, x);
  },

  intersections: function intersections() {
    return this.currentState().intersections;
  },

  deadStones: function deadStones() {
    return this._deadPoints;
  },

  coordinatesFor: function coordinatesFor(y, x) {
    return this.currentState().xCoordinateFor(x) + this.currentState().yCoordinateFor(y);
  },

  currentPlayer: function currentPlayer() {
    if (this._stillPlayingHandicapStones()) {
      return "black";
    }

    return this.currentState().nextColor();
  },

  isWhitePlaying: function isWhitePlaying() {
    return this.currentPlayer() === "white";
  },

  isBlackPlaying: function isBlackPlaying() {
    return this.currentPlayer() === "black";
  },

  score: function score() {
    return this._scorer.score(this);
  },

  currentState: function currentState() {
    return this._moves[this._moves.length - 1] || this._initialState;
  },

  moveNumber: function moveNumber() {
    return this.currentState().moveNumber;
  },

  labelsAt: function labelsAt(labels) {
    debugger
    var nextColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "black";
    // array of x, y, label
    for (var i = 0; i < labels.length; ++i) {
      var newState = this.currentState().labelAt(labels[i].x, labels[i].y, labels[i].label);
      this._moves.push(newState);
    }
    this._moves.push(this.currentState().setColor(nextColor));
    this.render();
    return true;
  },

  stonesAt: function stonesAt(stones) {
    var nextColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "black";
    // array of x, y, color
    for (var i = 0; i < stones.length; ++i) {
      var newState = this.currentState().playAt(stones[i].x, stones[i].y, stones[i].color, true);
      this._moves.push(newState);
    }
    this._moves.push(this.currentState().setColor(nextColor));
    this.render();
    return true;
  },

  playAt: function playAt(y, x) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$render = _ref2.render,
        render = _ref2$render === undefined ? true : _ref2$render;

    var player = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (this.isIllegalAt(y, x)) {
      return false;
    }

    var currentPlayer = player ? player : this.currentPlayer();

    var newState = this.currentState().playAt(y, x, currentPlayer);
    var _newState = newState,
        koPoint = _newState.koPoint;

    if (koPoint && !this._ruleset._isKoViolation(koPoint.y, koPoint.x, newState, this._moves.concat(newState))) {
      newState = newState.copyWithAttributes({ koPoint: null });
    }

    this._moves.push(newState);
    this.callbacks.postMove(this, currentPlayer, false);

    if (render) {
      this.render();
    }

    return true;
  },

  pass: function pass() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$render = _ref3.render,
        render = _ref3$render === undefined ? true : _ref3$render;

    if (this.isOver()) {
      return false;
    }

    var currentPlayer = this.currentPlayer();

    var newState = this.currentState().playPass(currentPlayer);
    this._moves.push(newState);
    this.callbacks.postMove(this, currentPlayer, true);

    if (render) {
      this.render();
    }

    return true;
  },

  isOver: function isOver() {
    if (this._moves.length < 2) {
      return false;
    }

    var finalMove = this._moves[this._moves.length - 1];
    var previousMove = this._moves[this._moves.length - 2];

    return finalMove.pass && previousMove.pass;
  },

  markDeadAt: function markDeadAt(y, x) {
    var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref4$render = _ref4.render,
        render = _ref4$render === undefined ? true : _ref4$render;

    if (this._isDeadAt(y, x)) {
      return true;
    }

    return this._setDeadStatus(y, x, true, { render: render });
  },

  unmarkDeadAt: function unmarkDeadAt(y, x) {
    var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref5$render = _ref5.render,
        render = _ref5$render === undefined ? true : _ref5$render;

    if (!this._isDeadAt(y, x)) {
      return true;
    }

    return this._setDeadStatus(y, x, false, { render: render });
  },

  toggleDeadAt: function toggleDeadAt(y, x) {
    var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref6$render = _ref6.render,
        render = _ref6$render === undefined ? true : _ref6$render;

    return this._setDeadStatus(y, x, !this._isDeadAt(y, x), { render: render });
  },

  _setDeadStatus: function _setDeadStatus(y, x, markingDead) {
    var _this2 = this;

    var _ref7 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref7$render = _ref7.render,
        render = _ref7$render === undefined ? true : _ref7$render;

    var selectedIntersection = this.intersectionAt(y, x);

    if (selectedIntersection.isEmpty()) {
      return;
    }

    var chosenDead = [];

    var _currentState$partiti = this.currentState().partitionTraverse(selectedIntersection, function (intersection) {
      return intersection.isEmpty() || intersection.sameColorAs(selectedIntersection);
    }),
        _currentState$partiti2 = _slicedToArray(_currentState$partiti, 1),
        candidates = _currentState$partiti2[0];

    candidates.forEach(function (sameColorOrEmpty) {
      if (!sameColorOrEmpty.isEmpty()) {
        chosenDead.push(sameColorOrEmpty);
      }
    });

    chosenDead.forEach(function (intersection) {
      if (markingDead) {
        _this2._deadPoints.push({ y: intersection.y, x: intersection.x });
      } else {
        _this2._deadPoints = _this2._deadPoints.filter(function (dead) {
          return !(dead.y === intersection.y && dead.x === intersection.x);
        });
      }
    });

    if (render) {
      this.render();
    }

    return true;
  },

  _isDeadAt: function _isDeadAt(y, x) {
    return this._deadPoints.some(function (dead) {
      return dead.y === y && dead.x === x;
    });
  },

  isIllegalAt: function isIllegalAt(y, x) {
    return this._ruleset.isIllegal(y, x, this);
  },

  territory: function territory() {
    if (!this.isOver()) {
      return {
        black: [],
        white: []
      };
    }

    return this._scorer.territory(this);
  },

  undo: function undo() {
    this._moves.pop();
    this.render();
  },

  clear: function clear() {
    this._moves = [];
    this.render();
  },

  render: function render() {
    if (!this.isOver()) {
      this._deadPoints = [];
    }

    this.renderer.render(this.currentState(), {
      territory: this.territory(),
      deadStones: this.deadStones()
    });

    this.callbacks.postRender(this);
  }
};

exports.default = Game;

//# sourceMappingURL=game.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWUuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJhcnIiLCJpIiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsInVuZGVmaW5lZCIsIl9pIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfcyIsIm5leHQiLCJkb25lIiwicHVzaCIsImxlbmd0aCIsImVyciIsIkFycmF5IiwiaXNBcnJheSIsIlR5cGVFcnJvciIsIl90eXBlb2YiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIl9kb21SZW5kZXJlciIsInJlcXVpcmUiLCJfZG9tUmVuZGVyZXIyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9zdmdSZW5kZXJlciIsIl9zdmdSZW5kZXJlcjIiLCJfbnVsbFJlbmRlcmVyIiwiX251bGxSZW5kZXJlcjIiLCJfYm9hcmRTdGF0ZSIsIl9ib2FyZFN0YXRlMiIsIl9ydWxlc2V0IiwiX3J1bGVzZXQyIiwiX3Njb3JlciIsIl9zY29yZXIyIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWQUxJRF9HQU1FX09QVElPTlMiLCJHYW1lIiwib3B0aW9ucyIsImFyZ3VtZW50cyIsIl92YWxpZGF0ZU9wdGlvbnMiLCJfZGVmYXVsdEJvYXJkU2l6ZSIsImJvYXJkU2l6ZSIsIl9tb3ZlcyIsImNhbGxiYWNrcyIsInBvc3RSZW5kZXIiLCJwb3N0TW92ZSIsIl9ib2FyZEVsZW1lbnQiLCJfZGVmYXVsdFNjb3JpbmciLCJfZGVmYXVsdEtvUnVsZSIsIl9kZWZhdWx0UmVuZGVyZXIiLCJfZGVhZFBvaW50cyIsIl9zZXR1cCIsImtleSIsImhhc093blByb3BlcnR5IiwiaW5kZXhPZiIsIkVycm9yIiwiX2NvbmZpZ3VyZU9wdGlvbnMiLCJfcmVmIiwiX3JlZiRib2FyZFNpemUiLCJfcmVmJGtvbWkiLCJrb21pIiwiX3JlZiRoYW5kaWNhcFN0b25lcyIsImhhbmRpY2FwU3RvbmVzIiwiX3JlZiRmcmVlSGFuZGljYXBQbGFjIiwiZnJlZUhhbmRpY2FwUGxhY2VtZW50IiwiX3JlZiRzY29yaW5nIiwic2NvcmluZyIsIl9yZWYka29SdWxlIiwia29SdWxlIiwiX3JlZiRyZW5kZXJlciIsInJlbmRlcmVyIiwiX2ZyZWVIYW5kaWNhcFBsYWNlbWVudCIsInNjb3JlQnkiLCJfcmVuZGVyZXJDaG9pY2UiLCJfaW5pdGlhbFN0YXRlIiwiX2luaXRpYWxGb3IiLCJfc3RpbGxQbGF5aW5nSGFuZGljYXBTdG9uZXMiLCJfdGhpcyIsImRlZmF1bHRSZW5kZXJlckhvb2tzIiwiaGFuZGxlQ2xpY2siLCJ5IiwieCIsImlzT3ZlciIsInRvZ2dsZURlYWRBdCIsInBsYXlBdCIsImhvdmVyVmFsdWUiLCJpc0lsbGVnYWxBdCIsImN1cnJlbnRQbGF5ZXIiLCJnYW1lSXNPdmVyIiwiaG9va3MiLCJmdXp6eVN0b25lUGxhY2VtZW50IiwicmVuZGVyIiwiaW50ZXJzZWN0aW9uQXQiLCJjdXJyZW50U3RhdGUiLCJpbnRlcnNlY3Rpb25zIiwiZGVhZFN0b25lcyIsImNvb3JkaW5hdGVzRm9yIiwieENvb3JkaW5hdGVGb3IiLCJ5Q29vcmRpbmF0ZUZvciIsIm5leHRDb2xvciIsImlzV2hpdGVQbGF5aW5nIiwiaXNCbGFja1BsYXlpbmciLCJzY29yZSIsIm1vdmVOdW1iZXIiLCJsYWJlbHNBdCIsImxhYmVscyIsIm5ld1N0YXRlIiwibGFiZWxBdCIsImxhYmVsIiwic2V0Q29sb3IiLCJzdG9uZXNBdCIsInN0b25lcyIsImNvbG9yIiwiX3JlZjIiLCJfcmVmMiRyZW5kZXIiLCJwbGF5ZXIiLCJfbmV3U3RhdGUiLCJrb1BvaW50IiwiX2lzS29WaW9sYXRpb24iLCJjb25jYXQiLCJjb3B5V2l0aEF0dHJpYnV0ZXMiLCJwYXNzIiwiX3JlZjMiLCJfcmVmMyRyZW5kZXIiLCJwbGF5UGFzcyIsImZpbmFsTW92ZSIsInByZXZpb3VzTW92ZSIsIm1hcmtEZWFkQXQiLCJfcmVmNCIsIl9yZWY0JHJlbmRlciIsIl9pc0RlYWRBdCIsIl9zZXREZWFkU3RhdHVzIiwidW5tYXJrRGVhZEF0IiwiX3JlZjUiLCJfcmVmNSRyZW5kZXIiLCJfcmVmNiIsIl9yZWY2JHJlbmRlciIsIm1hcmtpbmdEZWFkIiwiX3RoaXMyIiwiX3JlZjciLCJfcmVmNyRyZW5kZXIiLCJzZWxlY3RlZEludGVyc2VjdGlvbiIsImlzRW1wdHkiLCJjaG9zZW5EZWFkIiwiX2N1cnJlbnRTdGF0ZSRwYXJ0aXRpIiwicGFydGl0aW9uVHJhdmVyc2UiLCJpbnRlcnNlY3Rpb24iLCJzYW1lQ29sb3JBcyIsIl9jdXJyZW50U3RhdGUkcGFydGl0aTIiLCJjYW5kaWRhdGVzIiwiZm9yRWFjaCIsInNhbWVDb2xvck9yRW1wdHkiLCJmaWx0ZXIiLCJkZWFkIiwic29tZSIsImlzSWxsZWdhbCIsInRlcnJpdG9yeSIsImJsYWNrIiwid2hpdGUiLCJ1bmRvIiwicG9wIiwiY2xlYXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLElBQUlDLGlCQUFpQixZQUFZO0FBQUUsV0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLENBQTVCLEVBQStCO0FBQUUsUUFBSUMsT0FBTyxFQUFYLENBQWUsSUFBSUMsS0FBSyxJQUFULENBQWUsSUFBSUMsS0FBSyxLQUFULENBQWdCLElBQUlDLEtBQUtDLFNBQVQsQ0FBb0IsSUFBSTtBQUFFLFdBQUssSUFBSUMsS0FBS1AsSUFBSVEsT0FBT0MsUUFBWCxHQUFULEVBQWlDQyxFQUF0QyxFQUEwQyxFQUFFUCxLQUFLLENBQUNPLEtBQUtILEdBQUdJLElBQUgsRUFBTixFQUFpQkMsSUFBeEIsQ0FBMUMsRUFBeUVULEtBQUssSUFBOUUsRUFBb0Y7QUFBRUQsYUFBS1csSUFBTCxDQUFVSCxHQUFHYixLQUFiLEVBQXFCLElBQUlJLEtBQUtDLEtBQUtZLE1BQUwsS0FBZ0JiLENBQXpCLEVBQTRCO0FBQVE7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YW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2RvbVJlbmRlcmVyID0gcmVxdWlyZShcIi4vZG9tLXJlbmRlcmVyXCIpO1xuXG52YXIgX2RvbVJlbmRlcmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbVJlbmRlcmVyKTtcblxudmFyIF9zdmdSZW5kZXJlciA9IHJlcXVpcmUoXCIuL3N2Zy1yZW5kZXJlclwiKTtcblxudmFyIF9zdmdSZW5kZXJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdmdSZW5kZXJlcik7XG5cbnZhciBfbnVsbFJlbmRlcmVyID0gcmVxdWlyZShcIi4vbnVsbC1yZW5kZXJlclwiKTtcblxudmFyIF9udWxsUmVuZGVyZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbnVsbFJlbmRlcmVyKTtcblxudmFyIF9ib2FyZFN0YXRlID0gcmVxdWlyZShcIi4vYm9hcmQtc3RhdGVcIik7XG5cbnZhciBfYm9hcmRTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ib2FyZFN0YXRlKTtcblxudmFyIF9ydWxlc2V0ID0gcmVxdWlyZShcIi4vcnVsZXNldFwiKTtcblxudmFyIF9ydWxlc2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3J1bGVzZXQpO1xuXG52YXIgX3Njb3JlciA9IHJlcXVpcmUoXCIuL3Njb3JlclwiKTtcblxudmFyIF9zY29yZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2NvcmVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFZBTElEX0dBTUVfT1BUSU9OUyA9IFtcImVsZW1lbnRcIiwgXCJib2FyZFNpemVcIiwgXCJzY29yaW5nXCIsIFwiaGFuZGljYXBTdG9uZXNcIiwgXCJrb1J1bGVcIiwgXCJrb21pXCIsIFwiX2hvb2tzXCIsIFwiZnV6enlTdG9uZVBsYWNlbWVudFwiLCBcInJlbmRlcmVyXCIsIFwiZnJlZUhhbmRpY2FwUGxhY2VtZW50XCJdO1xuXG52YXIgR2FtZSA9IGZ1bmN0aW9uIEdhbWUoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICB0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgdGhpcy5fZGVmYXVsdEJvYXJkU2l6ZSA9IDE5O1xuICB0aGlzLmJvYXJkU2l6ZSA9IG51bGw7XG4gIHRoaXMuX21vdmVzID0gW107XG4gIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgIHBvc3RSZW5kZXI6IGZ1bmN0aW9uIHBvc3RSZW5kZXIoKSB7fSxcbiAgICBwb3N0TW92ZTogZnVuY3Rpb24gcG9zdE1vdmUoKSB7fSAvLyBhcmc6IGN1cnJlbnRQbGF5ZXIsIGlzUGFzc1xuICB9O1xuICB0aGlzLl9ib2FyZEVsZW1lbnQgPSBvcHRpb25zW1wiZWxlbWVudFwiXTtcbiAgdGhpcy5fZGVmYXVsdFNjb3JpbmcgPSBcInRlcnJpdG9yeVwiO1xuICB0aGlzLl9kZWZhdWx0S29SdWxlID0gXCJzaW1wbGVcIjtcbiAgdGhpcy5fZGVmYXVsdFJlbmRlcmVyID0gXCJzdmdcIjtcbiAgdGhpcy5fZGVhZFBvaW50cyA9IFtdO1xuXG4gIHRoaXMuX3NldHVwKG9wdGlvbnMpO1xufTtcblxuR2FtZS5wcm90b3R5cGUgPSB7XG4gIF92YWxpZGF0ZU9wdGlvbnM6IGZ1bmN0aW9uIF92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucykge1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGlmIChWQUxJRF9HQU1FX09QVElPTlMuaW5kZXhPZihrZXkpIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBnYW1lIG9wdGlvbjogXCIgKyBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zW2tleV0gPT09IFwidW5kZWZpbmVkXCIgfHwgb3B0aW9uc1trZXldID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2FtZSBvcHRpb24gXCIgKyBrZXkgKyBcIiBtdXN0IG5vdCBiZSBzZXQgYXMgbnVsbCBvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX2NvbmZpZ3VyZU9wdGlvbnM6IGZ1bmN0aW9uIF9jb25maWd1cmVPcHRpb25zKCkge1xuICAgIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgICAgX3JlZiRib2FyZFNpemUgPSBfcmVmLmJvYXJkU2l6ZSxcbiAgICAgICAgYm9hcmRTaXplID0gX3JlZiRib2FyZFNpemUgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHRCb2FyZFNpemUgOiBfcmVmJGJvYXJkU2l6ZSxcbiAgICAgICAgX3JlZiRrb21pID0gX3JlZi5rb21pLFxuICAgICAgICBrb21pID0gX3JlZiRrb21pID09PSB1bmRlZmluZWQgPyAwIDogX3JlZiRrb21pLFxuICAgICAgICBfcmVmJGhhbmRpY2FwU3RvbmVzID0gX3JlZi5oYW5kaWNhcFN0b25lcyxcbiAgICAgICAgaGFuZGljYXBTdG9uZXMgPSBfcmVmJGhhbmRpY2FwU3RvbmVzID09PSB1bmRlZmluZWQgPyAwIDogX3JlZiRoYW5kaWNhcFN0b25lcyxcbiAgICAgICAgX3JlZiRmcmVlSGFuZGljYXBQbGFjID0gX3JlZi5mcmVlSGFuZGljYXBQbGFjZW1lbnQsXG4gICAgICAgIGZyZWVIYW5kaWNhcFBsYWNlbWVudCA9IF9yZWYkZnJlZUhhbmRpY2FwUGxhYyA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJGZyZWVIYW5kaWNhcFBsYWMsXG4gICAgICAgIF9yZWYkc2NvcmluZyA9IF9yZWYuc2NvcmluZyxcbiAgICAgICAgc2NvcmluZyA9IF9yZWYkc2NvcmluZyA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdFNjb3JpbmcgOiBfcmVmJHNjb3JpbmcsXG4gICAgICAgIF9yZWYka29SdWxlID0gX3JlZi5rb1J1bGUsXG4gICAgICAgIGtvUnVsZSA9IF9yZWYka29SdWxlID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0S29SdWxlIDogX3JlZiRrb1J1bGUsXG4gICAgICAgIF9yZWYkcmVuZGVyZXIgPSBfcmVmLnJlbmRlcmVyLFxuICAgICAgICByZW5kZXJlciA9IF9yZWYkcmVuZGVyZXIgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHRSZW5kZXJlciA6IF9yZWYkcmVuZGVyZXI7XG5cbiAgICBpZiAodHlwZW9mIGJvYXJkU2l6ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQm9hcmQgc2l6ZSBtdXN0IGJlIGEgbnVtYmVyLCBidXQgd2FzOiBcIiArICh0eXBlb2YgYm9hcmRTaXplID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoYm9hcmRTaXplKSkpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaGFuZGljYXBTdG9uZXMgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhhbmRpY2FwIHN0b25lcyBtdXN0IGJlIGEgbnVtYmVyLCBidXQgd2FzOiBcIiArICh0eXBlb2YgYm9hcmRTaXplID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoYm9hcmRTaXplKSkpO1xuICAgIH1cblxuICAgIGlmIChoYW5kaWNhcFN0b25lcyA+IDAgJiYgYm9hcmRTaXplICE9PSA5ICYmIGJvYXJkU2l6ZSAhPT0gMTMgJiYgYm9hcmRTaXplICE9PSAxOSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGFuZGljYXAgc3RvbmVzIG5vdCBzdXBwb3J0ZWQgb24gc2l6ZXMgb3RoZXIgdGhhbiA5eDksIDEzeDEzIGFuZCAxOXgxOVwiKTtcbiAgICB9XG5cbiAgICBpZiAoaGFuZGljYXBTdG9uZXMgPCAwIHx8IGhhbmRpY2FwU3RvbmVzID09PSAxIHx8IGhhbmRpY2FwU3RvbmVzID4gOSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSAyIHRvIDkgaGFuZGljYXAgc3RvbmVzIGFyZSBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgaWYgKGJvYXJkU2l6ZSA+IDE5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW5ub3QgZ2VuZXJhdGUgYSBib2FyZCBzaXplIGdyZWF0ZXIgdGhhbiAxOVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmJvYXJkU2l6ZSA9IGJvYXJkU2l6ZTtcbiAgICB0aGlzLmhhbmRpY2FwU3RvbmVzID0gaGFuZGljYXBTdG9uZXM7XG4gICAgdGhpcy5fZnJlZUhhbmRpY2FwUGxhY2VtZW50ID0gZnJlZUhhbmRpY2FwUGxhY2VtZW50O1xuXG4gICAgdGhpcy5fc2NvcmVyID0gbmV3IF9zY29yZXIyLmRlZmF1bHQoe1xuICAgICAgc2NvcmVCeTogc2NvcmluZyxcbiAgICAgIGtvbWk6IGtvbWlcbiAgICB9KTtcblxuICAgIHRoaXMuX3JlbmRlcmVyQ2hvaWNlID0ge1xuICAgICAgXCJkb21cIjogX2RvbVJlbmRlcmVyMi5kZWZhdWx0LFxuICAgICAgXCJzdmdcIjogX3N2Z1JlbmRlcmVyMi5kZWZhdWx0XG4gICAgfVtyZW5kZXJlcl07XG5cbiAgICBpZiAoIXRoaXMuX3JlbmRlcmVyQ2hvaWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHJlbmRlcmVyOiBcIiArIHJlbmRlcmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLl9ydWxlc2V0ID0gbmV3IF9ydWxlc2V0Mi5kZWZhdWx0KHtcbiAgICAgIGtvUnVsZToga29SdWxlXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fZnJlZUhhbmRpY2FwUGxhY2VtZW50KSB7XG4gICAgICB0aGlzLl9pbml0aWFsU3RhdGUgPSBfYm9hcmRTdGF0ZTIuZGVmYXVsdC5faW5pdGlhbEZvcihib2FyZFNpemUsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbml0aWFsU3RhdGUgPSBfYm9hcmRTdGF0ZTIuZGVmYXVsdC5faW5pdGlhbEZvcihib2FyZFNpemUsIGhhbmRpY2FwU3RvbmVzKTtcbiAgICB9XG4gIH0sXG5cbiAgX3N0aWxsUGxheWluZ0hhbmRpY2FwU3RvbmVzOiBmdW5jdGlvbiBfc3RpbGxQbGF5aW5nSGFuZGljYXBTdG9uZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZyZWVIYW5kaWNhcFBsYWNlbWVudCAmJiB0aGlzLmhhbmRpY2FwU3RvbmVzID4gMCAmJiB0aGlzLl9tb3Zlcy5sZW5ndGggPCB0aGlzLmhhbmRpY2FwU3RvbmVzO1xuICB9LFxuXG4gIF9zZXR1cDogZnVuY3Rpb24gX3NldHVwKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICB0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fY29uZmlndXJlT3B0aW9ucyhvcHRpb25zKTtcblxuICAgIGlmICh0aGlzLl9ib2FyZEVsZW1lbnQpIHtcbiAgICAgIHZhciBkZWZhdWx0UmVuZGVyZXJIb29rcyA9IHtcbiAgICAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKHksIHgpIHtcbiAgICAgICAgICBpZiAoX3RoaXMuaXNPdmVyKCkpIHtcbiAgICAgICAgICAgIF90aGlzLnRvZ2dsZURlYWRBdCh5LCB4KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMucGxheUF0KHksIHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBob3ZlclZhbHVlOiBmdW5jdGlvbiBob3ZlclZhbHVlKHksIHgpIHtcbiAgICAgICAgICBpZiAoIV90aGlzLmlzT3ZlcigpICYmICFfdGhpcy5pc0lsbGVnYWxBdCh5LCB4KSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmN1cnJlbnRQbGF5ZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2FtZUlzT3ZlcjogZnVuY3Rpb24gZ2FtZUlzT3ZlcigpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuaXNPdmVyKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgdGhpcy5fcmVuZGVyZXJDaG9pY2UodGhpcy5fYm9hcmRFbGVtZW50LCB7XG4gICAgICAgIGhvb2tzOiBvcHRpb25zW1wiX2hvb2tzXCJdIHx8IGRlZmF1bHRSZW5kZXJlckhvb2tzLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgZnV6enlTdG9uZVBsYWNlbWVudDogb3B0aW9uc1tcImZ1enp5U3RvbmVQbGFjZW1lbnRcIl1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgX251bGxSZW5kZXJlcjIuZGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH0sXG5cbiAgaW50ZXJzZWN0aW9uQXQ6IGZ1bmN0aW9uIGludGVyc2VjdGlvbkF0KHksIHgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGUoKS5pbnRlcnNlY3Rpb25BdCh5LCB4KTtcbiAgfSxcblxuICBpbnRlcnNlY3Rpb25zOiBmdW5jdGlvbiBpbnRlcnNlY3Rpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGF0ZSgpLmludGVyc2VjdGlvbnM7XG4gIH0sXG5cbiAgZGVhZFN0b25lczogZnVuY3Rpb24gZGVhZFN0b25lcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVhZFBvaW50cztcbiAgfSxcblxuICBjb29yZGluYXRlc0ZvcjogZnVuY3Rpb24gY29vcmRpbmF0ZXNGb3IoeSwgeCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGF0ZSgpLnhDb29yZGluYXRlRm9yKHgpICsgdGhpcy5jdXJyZW50U3RhdGUoKS55Q29vcmRpbmF0ZUZvcih5KTtcbiAgfSxcblxuICBjdXJyZW50UGxheWVyOiBmdW5jdGlvbiBjdXJyZW50UGxheWVyKCkge1xuICAgIGlmICh0aGlzLl9zdGlsbFBsYXlpbmdIYW5kaWNhcFN0b25lcygpKSB7XG4gICAgICByZXR1cm4gXCJibGFja1wiO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGF0ZSgpLm5leHRDb2xvcigpO1xuICB9LFxuXG4gIGlzV2hpdGVQbGF5aW5nOiBmdW5jdGlvbiBpc1doaXRlUGxheWluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50UGxheWVyKCkgPT09IFwid2hpdGVcIjtcbiAgfSxcblxuICBpc0JsYWNrUGxheWluZzogZnVuY3Rpb24gaXNCbGFja1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBsYXllcigpID09PSBcImJsYWNrXCI7XG4gIH0sXG5cbiAgc2NvcmU6IGZ1bmN0aW9uIHNjb3JlKCkge1xuICAgIHJldHVybiB0aGlzLl9zY29yZXIuc2NvcmUodGhpcyk7XG4gIH0sXG5cbiAgY3VycmVudFN0YXRlOiBmdW5jdGlvbiBjdXJyZW50U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vdmVzW3RoaXMuX21vdmVzLmxlbmd0aCAtIDFdIHx8IHRoaXMuX2luaXRpYWxTdGF0ZTtcbiAgfSxcblxuICBtb3ZlTnVtYmVyOiBmdW5jdGlvbiBtb3ZlTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGF0ZSgpLm1vdmVOdW1iZXI7XG4gIH0sXG5cbiAgbGFiZWxzQXQ6IGZ1bmN0aW9uIGxhYmVsc0F0KGxhYmVscykge1xuICAgIHZhciBuZXh0Q29sb3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IFwiYmxhY2tcIjtcbiAgICAvLyBhcnJheSBvZiB4LCB5LCBsYWJlbFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFiZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgbmV3U3RhdGUgPSB0aGlzLmN1cnJlbnRTdGF0ZSgpLmxhYmVsQXQobGFiZWxzW2ldLngsIGxhYmVsc1tpXS55LCBsYWJlbHNbaV0ubGFiZWwpO1xuICAgICAgdGhpcy5fbW92ZXMucHVzaChuZXdTdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuX21vdmVzLnB1c2godGhpcy5jdXJyZW50U3RhdGUoKS5zZXRDb2xvcihuZXh0Q29sb3IpKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIHN0b25lc0F0OiBmdW5jdGlvbiBzdG9uZXNBdChzdG9uZXMpIHtcbiAgICB2YXIgbmV4dENvbG9yID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBcImJsYWNrXCI7XG4gICAgLy8gYXJyYXkgb2YgeCwgeSwgY29sb3JcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0b25lcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIG5ld1N0YXRlID0gdGhpcy5jdXJyZW50U3RhdGUoKS5wbGF5QXQoc3RvbmVzW2ldLngsIHN0b25lc1tpXS55LCBzdG9uZXNbaV0uY29sb3IsIHRydWUpO1xuICAgICAgdGhpcy5fbW92ZXMucHVzaChuZXdTdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuX21vdmVzLnB1c2godGhpcy5jdXJyZW50U3RhdGUoKS5zZXRDb2xvcihuZXh0Q29sb3IpKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIHBsYXlBdDogZnVuY3Rpb24gcGxheUF0KHksIHgpIHtcbiAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9LFxuICAgICAgICBfcmVmMiRyZW5kZXIgPSBfcmVmMi5yZW5kZXIsXG4gICAgICAgIHJlbmRlciA9IF9yZWYyJHJlbmRlciA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJHJlbmRlcjtcblxuICAgIHZhciBwbGF5ZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IG51bGw7XG5cbiAgICBpZiAodGhpcy5pc0lsbGVnYWxBdCh5LCB4KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50UGxheWVyID0gcGxheWVyID8gcGxheWVyIDogdGhpcy5jdXJyZW50UGxheWVyKCk7XG5cbiAgICB2YXIgbmV3U3RhdGUgPSB0aGlzLmN1cnJlbnRTdGF0ZSgpLnBsYXlBdCh5LCB4LCBjdXJyZW50UGxheWVyKTtcbiAgICB2YXIgX25ld1N0YXRlID0gbmV3U3RhdGUsXG4gICAgICAgIGtvUG9pbnQgPSBfbmV3U3RhdGUua29Qb2ludDtcblxuXG4gICAgaWYgKGtvUG9pbnQgJiYgIXRoaXMuX3J1bGVzZXQuX2lzS29WaW9sYXRpb24oa29Qb2ludC55LCBrb1BvaW50LngsIG5ld1N0YXRlLCB0aGlzLl9tb3Zlcy5jb25jYXQobmV3U3RhdGUpKSkge1xuICAgICAgbmV3U3RhdGUgPSBuZXdTdGF0ZS5jb3B5V2l0aEF0dHJpYnV0ZXMoeyBrb1BvaW50OiBudWxsIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX21vdmVzLnB1c2gobmV3U3RhdGUpO1xuICAgIHRoaXMuY2FsbGJhY2tzLnBvc3RNb3ZlKHRoaXMsIGN1cnJlbnRQbGF5ZXIsIGZhbHNlKTtcblxuICAgIGlmIChyZW5kZXIpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgcGFzczogZnVuY3Rpb24gcGFzcygpIHtcbiAgICB2YXIgX3JlZjMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuICAgICAgICBfcmVmMyRyZW5kZXIgPSBfcmVmMy5yZW5kZXIsXG4gICAgICAgIHJlbmRlciA9IF9yZWYzJHJlbmRlciA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYzJHJlbmRlcjtcblxuICAgIGlmICh0aGlzLmlzT3ZlcigpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRQbGF5ZXIgPSB0aGlzLmN1cnJlbnRQbGF5ZXIoKTtcblxuICAgIHZhciBuZXdTdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlKCkucGxheVBhc3MoY3VycmVudFBsYXllcik7XG4gICAgdGhpcy5fbW92ZXMucHVzaChuZXdTdGF0ZSk7XG4gICAgdGhpcy5jYWxsYmFja3MucG9zdE1vdmUodGhpcywgY3VycmVudFBsYXllciwgdHJ1ZSk7XG5cbiAgICBpZiAocmVuZGVyKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIGlzT3ZlcjogZnVuY3Rpb24gaXNPdmVyKCkge1xuICAgIGlmICh0aGlzLl9tb3Zlcy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGZpbmFsTW92ZSA9IHRoaXMuX21vdmVzW3RoaXMuX21vdmVzLmxlbmd0aCAtIDFdO1xuICAgIHZhciBwcmV2aW91c01vdmUgPSB0aGlzLl9tb3Zlc1t0aGlzLl9tb3Zlcy5sZW5ndGggLSAyXTtcblxuICAgIHJldHVybiBmaW5hbE1vdmUucGFzcyAmJiBwcmV2aW91c01vdmUucGFzcztcbiAgfSxcblxuICBtYXJrRGVhZEF0OiBmdW5jdGlvbiBtYXJrRGVhZEF0KHksIHgpIHtcbiAgICB2YXIgX3JlZjQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9LFxuICAgICAgICBfcmVmNCRyZW5kZXIgPSBfcmVmNC5yZW5kZXIsXG4gICAgICAgIHJlbmRlciA9IF9yZWY0JHJlbmRlciA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWY0JHJlbmRlcjtcblxuICAgIGlmICh0aGlzLl9pc0RlYWRBdCh5LCB4KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3NldERlYWRTdGF0dXMoeSwgeCwgdHJ1ZSwgeyByZW5kZXI6IHJlbmRlciB9KTtcbiAgfSxcblxuICB1bm1hcmtEZWFkQXQ6IGZ1bmN0aW9uIHVubWFya0RlYWRBdCh5LCB4KSB7XG4gICAgdmFyIF9yZWY1ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fSxcbiAgICAgICAgX3JlZjUkcmVuZGVyID0gX3JlZjUucmVuZGVyLFxuICAgICAgICByZW5kZXIgPSBfcmVmNSRyZW5kZXIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmNSRyZW5kZXI7XG5cbiAgICBpZiAoIXRoaXMuX2lzRGVhZEF0KHksIHgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc2V0RGVhZFN0YXR1cyh5LCB4LCBmYWxzZSwgeyByZW5kZXI6IHJlbmRlciB9KTtcbiAgfSxcblxuICB0b2dnbGVEZWFkQXQ6IGZ1bmN0aW9uIHRvZ2dsZURlYWRBdCh5LCB4KSB7XG4gICAgdmFyIF9yZWY2ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fSxcbiAgICAgICAgX3JlZjYkcmVuZGVyID0gX3JlZjYucmVuZGVyLFxuICAgICAgICByZW5kZXIgPSBfcmVmNiRyZW5kZXIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmNiRyZW5kZXI7XG5cbiAgICByZXR1cm4gdGhpcy5fc2V0RGVhZFN0YXR1cyh5LCB4LCAhdGhpcy5faXNEZWFkQXQoeSwgeCksIHsgcmVuZGVyOiByZW5kZXIgfSk7XG4gIH0sXG5cbiAgX3NldERlYWRTdGF0dXM6IGZ1bmN0aW9uIF9zZXREZWFkU3RhdHVzKHksIHgsIG1hcmtpbmdEZWFkKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgX3JlZjcgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHt9LFxuICAgICAgICBfcmVmNyRyZW5kZXIgPSBfcmVmNy5yZW5kZXIsXG4gICAgICAgIHJlbmRlciA9IF9yZWY3JHJlbmRlciA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWY3JHJlbmRlcjtcblxuICAgIHZhciBzZWxlY3RlZEludGVyc2VjdGlvbiA9IHRoaXMuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG5cbiAgICBpZiAoc2VsZWN0ZWRJbnRlcnNlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNob3NlbkRlYWQgPSBbXTtcblxuICAgIHZhciBfY3VycmVudFN0YXRlJHBhcnRpdGkgPSB0aGlzLmN1cnJlbnRTdGF0ZSgpLnBhcnRpdGlvblRyYXZlcnNlKHNlbGVjdGVkSW50ZXJzZWN0aW9uLCBmdW5jdGlvbiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICByZXR1cm4gaW50ZXJzZWN0aW9uLmlzRW1wdHkoKSB8fCBpbnRlcnNlY3Rpb24uc2FtZUNvbG9yQXMoc2VsZWN0ZWRJbnRlcnNlY3Rpb24pO1xuICAgIH0pLFxuICAgICAgICBfY3VycmVudFN0YXRlJHBhcnRpdGkyID0gX3NsaWNlZFRvQXJyYXkoX2N1cnJlbnRTdGF0ZSRwYXJ0aXRpLCAxKSxcbiAgICAgICAgY2FuZGlkYXRlcyA9IF9jdXJyZW50U3RhdGUkcGFydGl0aTJbMF07XG5cbiAgICBjYW5kaWRhdGVzLmZvckVhY2goZnVuY3Rpb24gKHNhbWVDb2xvck9yRW1wdHkpIHtcbiAgICAgIGlmICghc2FtZUNvbG9yT3JFbXB0eS5pc0VtcHR5KCkpIHtcbiAgICAgICAgY2hvc2VuRGVhZC5wdXNoKHNhbWVDb2xvck9yRW1wdHkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2hvc2VuRGVhZC5mb3JFYWNoKGZ1bmN0aW9uIChpbnRlcnNlY3Rpb24pIHtcbiAgICAgIGlmIChtYXJraW5nRGVhZCkge1xuICAgICAgICBfdGhpczIuX2RlYWRQb2ludHMucHVzaCh7IHk6IGludGVyc2VjdGlvbi55LCB4OiBpbnRlcnNlY3Rpb24ueCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzMi5fZGVhZFBvaW50cyA9IF90aGlzMi5fZGVhZFBvaW50cy5maWx0ZXIoZnVuY3Rpb24gKGRlYWQpIHtcbiAgICAgICAgICByZXR1cm4gIShkZWFkLnkgPT09IGludGVyc2VjdGlvbi55ICYmIGRlYWQueCA9PT0gaW50ZXJzZWN0aW9uLngpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChyZW5kZXIpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgX2lzRGVhZEF0OiBmdW5jdGlvbiBfaXNEZWFkQXQoeSwgeCkge1xuICAgIHJldHVybiB0aGlzLl9kZWFkUG9pbnRzLnNvbWUoZnVuY3Rpb24gKGRlYWQpIHtcbiAgICAgIHJldHVybiBkZWFkLnkgPT09IHkgJiYgZGVhZC54ID09PSB4O1xuICAgIH0pO1xuICB9LFxuXG4gIGlzSWxsZWdhbEF0OiBmdW5jdGlvbiBpc0lsbGVnYWxBdCh5LCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuX3J1bGVzZXQuaXNJbGxlZ2FsKHksIHgsIHRoaXMpO1xuICB9LFxuXG4gIHRlcnJpdG9yeTogZnVuY3Rpb24gdGVycml0b3J5KCkge1xuICAgIGlmICghdGhpcy5pc092ZXIoKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYmxhY2s6IFtdLFxuICAgICAgICB3aGl0ZTogW11cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3Njb3Jlci50ZXJyaXRvcnkodGhpcyk7XG4gIH0sXG5cbiAgdW5kbzogZnVuY3Rpb24gdW5kbygpIHtcbiAgICB0aGlzLl9tb3Zlcy5wb3AoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9LFxuXG4gIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICB0aGlzLl9tb3ZlcyA9IFtdO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3ZlcigpKSB7XG4gICAgICB0aGlzLl9kZWFkUG9pbnRzID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5jdXJyZW50U3RhdGUoKSwge1xuICAgICAgdGVycml0b3J5OiB0aGlzLnRlcnJpdG9yeSgpLFxuICAgICAgZGVhZFN0b25lczogdGhpcy5kZWFkU3RvbmVzKClcbiAgICB9KTtcblxuICAgIHRoaXMuY2FsbGJhY2tzLnBvc3RSZW5kZXIodGhpcyk7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEdhbWU7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdhbWUuanMubWFwIl19
},{"./board-state":2,"./dom-renderer":4,"./null-renderer":8,"./ruleset":11,"./scorer":12,"./svg-renderer":13}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Intersection = function Intersection(y, x, value, label) {
  this.y = y;
  this.x = x;
  this.value = value || "empty";
  this.label = label || "empty";

  Object.freeze(this);
};

Intersection.prototype = {
  isOccupiedWith: function isOccupiedWith(color) {
    if (this.isEmpty()) {
      return false;
    }

    return this.value === color;
  },

  hasLabel: function hasLabel() {
    return this.label && this.label !== "empty";
  },

  getLabel: function getLabel() {
    return this.label;
  },

  isBlack: function isBlack() {
    return this.value === "black";
  },

  isWhite: function isWhite() {
    return this.value === "white";
  },

  isEmpty: function isEmpty() {
    return this.value === "empty";
  },

  sameColorAs: function sameColorAs(otherIntersection) {
    return this.value === otherIntersection.value;
  }
};

exports.default = Intersection;

//# sourceMappingURL=intersection.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVyc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIkludGVyc2VjdGlvbiIsInkiLCJ4IiwibGFiZWwiLCJmcmVlemUiLCJwcm90b3R5cGUiLCJpc09jY3VwaWVkV2l0aCIsImNvbG9yIiwiaXNFbXB0eSIsImhhc0xhYmVsIiwiZ2V0TGFiZWwiLCJpc0JsYWNrIiwiaXNXaGl0ZSIsInNhbWVDb2xvckFzIiwib3RoZXJJbnRlcnNlY3Rpb24iLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJQyxlQUFlLFNBQVNBLFlBQVQsQ0FBc0JDLENBQXRCLEVBQXlCQyxDQUF6QixFQUE0QkgsS0FBNUIsRUFBbUNJLEtBQW5DLEVBQTBDO0FBQzNELE9BQUtGLENBQUwsR0FBU0EsQ0FBVDtBQUNBLE9BQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLE9BQUtILEtBQUwsR0FBYUEsU0FBUyxPQUF0QjtBQUNBLE9BQUtJLEtBQUwsR0FBYUEsU0FBUyxPQUF0Qjs7QUFFQVAsU0FBT1EsTUFBUCxDQUFjLElBQWQ7QUFDRCxDQVBEOztBQVNBSixhQUFhSyxTQUFiLEdBQXlCO0FBQ3ZCQyxrQkFBZ0IsU0FBU0EsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7QUFDN0MsUUFBSSxLQUFLQyxPQUFMLEVBQUosRUFBb0I7QUFDbEIsYUFBTyxLQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLVCxLQUFMLEtBQWVRLEtBQXRCO0FBQ0QsR0FQc0I7O0FBU3ZCRSxZQUFVLFNBQVNBLFFBQVQsR0FBb0I7QUFDNUIsV0FBTyxLQUFLTixLQUFMLElBQWMsS0FBS0EsS0FBTCxLQUFlLE9BQXBDO0FBQ0QsR0FYc0I7O0FBYXZCTyxZQUFVLFNBQVNBLFFBQVQsR0FBb0I7QUFDNUIsV0FBTyxLQUFLUCxLQUFaO0FBQ0QsR0Fmc0I7O0FBaUJ2QlEsV0FBUyxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFdBQU8sS0FBS1osS0FBTCxLQUFlLE9BQXRCO0FBQ0QsR0FuQnNCOztBQXFCdkJhLFdBQVMsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQixXQUFPLEtBQUtiLEtBQUwsS0FBZSxPQUF0QjtBQUNELEdBdkJzQjs7QUF5QnZCUyxXQUFTLFNBQVNBLE9BQVQsR0FBbUI7QUFDMUIsV0FBTyxLQUFLVCxLQUFMLEtBQWUsT0FBdEI7QUFDRCxHQTNCc0I7O0FBNkJ2QmMsZUFBYSxTQUFTQSxXQUFULENBQXFCQyxpQkFBckIsRUFBd0M7QUFDbkQsV0FBTyxLQUFLZixLQUFMLEtBQWVlLGtCQUFrQmYsS0FBeEM7QUFDRDtBQS9Cc0IsQ0FBekI7O0FBa0NBRCxRQUFRaUIsT0FBUixHQUFrQmYsWUFBbEI7O0FBRUEiLCJmaWxlIjoiaW50ZXJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgSW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gSW50ZXJzZWN0aW9uKHksIHgsIHZhbHVlLCBsYWJlbCkge1xuICB0aGlzLnkgPSB5O1xuICB0aGlzLnggPSB4O1xuICB0aGlzLnZhbHVlID0gdmFsdWUgfHwgXCJlbXB0eVwiO1xuICB0aGlzLmxhYmVsID0gbGFiZWwgfHwgXCJlbXB0eVwiO1xuXG4gIE9iamVjdC5mcmVlemUodGhpcyk7XG59O1xuXG5JbnRlcnNlY3Rpb24ucHJvdG90eXBlID0ge1xuICBpc09jY3VwaWVkV2l0aDogZnVuY3Rpb24gaXNPY2N1cGllZFdpdGgoY29sb3IpIHtcbiAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gY29sb3I7XG4gIH0sXG5cbiAgaGFzTGFiZWw6IGZ1bmN0aW9uIGhhc0xhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLmxhYmVsICYmIHRoaXMubGFiZWwgIT09IFwiZW1wdHlcIjtcbiAgfSxcblxuICBnZXRMYWJlbDogZnVuY3Rpb24gZ2V0TGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFiZWw7XG4gIH0sXG5cbiAgaXNCbGFjazogZnVuY3Rpb24gaXNCbGFjaygpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gXCJibGFja1wiO1xuICB9LFxuXG4gIGlzV2hpdGU6IGZ1bmN0aW9uIGlzV2hpdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IFwid2hpdGVcIjtcbiAgfSxcblxuICBpc0VtcHR5OiBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBcImVtcHR5XCI7XG4gIH0sXG5cbiAgc2FtZUNvbG9yQXM6IGZ1bmN0aW9uIHNhbWVDb2xvckFzKG90aGVySW50ZXJzZWN0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IG90aGVySW50ZXJzZWN0aW9uLnZhbHVlO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBJbnRlcnNlY3Rpb247XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyc2VjdGlvbi5qcy5tYXAiXX0=
},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NullRenderer;
function NullRenderer() {
  this.setup = function () {};
  this.render = function () {};
  this.renderTerritory = function () {};
}

//# sourceMappingURL=null-renderer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bGwtcmVuZGVyZXIuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0IiwiTnVsbFJlbmRlcmVyIiwic2V0dXAiLCJyZW5kZXIiLCJyZW5kZXJUZXJyaXRvcnkiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsU0FBTztBQURvQyxDQUE3QztBQUdBRCxRQUFRRSxPQUFSLEdBQWtCQyxZQUFsQjtBQUNBLFNBQVNBLFlBQVQsR0FBd0I7QUFDdEIsT0FBS0MsS0FBTCxHQUFhLFlBQVksQ0FBRSxDQUEzQjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxZQUFZLENBQUUsQ0FBNUI7QUFDQSxPQUFLQyxlQUFMLEdBQXVCLFlBQVksQ0FBRSxDQUFyQztBQUNEOztBQUVEIiwiZmlsZSI6Im51bGwtcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IE51bGxSZW5kZXJlcjtcbmZ1bmN0aW9uIE51bGxSZW5kZXJlcigpIHtcbiAgdGhpcy5zZXR1cCA9IGZ1bmN0aW9uICgpIHt9O1xuICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICgpIHt9O1xuICB0aGlzLnJlbmRlclRlcnJpdG9yeSA9IGZ1bmN0aW9uICgpIHt9O1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1udWxsLXJlbmRlcmVyLmpzLm1hcCJdfQ==
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Region = function Region(boardState, intersections) {
  this.boardState = boardState;
  this.intersections = intersections;

  this._computed = {};

  Object.freeze(this);
};

Region._startingAt = function (boardState, y, x) {
  var startingPoint = boardState.intersectionAt(y, x);

  var _boardState$partition = boardState.partitionTraverse(startingPoint, function (neighbor) {
    return neighbor.sameColorAs(startingPoint);
  }),
      _boardState$partition2 = _slicedToArray(_boardState$partition, 2),
      includedPoints = _boardState$partition2[0],
      boundaryPoints = _boardState$partition2[1];

  return [includedPoints, boundaryPoints];
};

Region.allFor = function (boardState) {
  var checkedPoints = [];
  var regions = [];

  boardState.intersections.forEach(function (point) {
    if (checkedPoints.indexOf(point) > -1) {
      // do nothing
    } else {
      var _boardState$partition3 = boardState.partitionTraverse(point, function (neighbor) {
        return neighbor.sameColorAs(point);
      }),
          _boardState$partition4 = _slicedToArray(_boardState$partition3, 2),
          regionPoints = _boardState$partition4[0],
          _ = _boardState$partition4[1];

      regions.push(new Region(boardState, regionPoints));
      checkedPoints = checkedPoints.concat(regionPoints);
    }
  });

  return regions;
};

Region.merge = function (regions, region) {
  var mergedRegions = [region];
  var length = -1;

  while (mergedRegions.length !== length) {
    length = mergedRegions.length;

    mergedRegions = regions.filter(function (r) {
      return r.isEmpty() && r.isTerritory() && r.territoryColor() === region.territoryColor() && r.expandedBoundaryStones().some(function (stone) {
        return mergedRegions.some(function (latestRegion) {
          return latestRegion.expandedBoundaryStones().indexOf(stone) > -1;
        });
      });
    });
  }

  return mergedRegions;
};

Region.prototype = {
  isEmpty: function isEmpty() {
    return this.intersections[0].isEmpty();
  },

  isTerritory: function isTerritory() {
    var point = this.intersections[0];

    if (!point.isEmpty()) {
      return false;
    }

    var _Region$_startingAt = Region._startingAt(this.boardState, point.y, point.x),
        _Region$_startingAt2 = _slicedToArray(_Region$_startingAt, 2),
        _ = _Region$_startingAt2[0],
        boundaryPoints = _Region$_startingAt2[1];

    var surroundingColors = _utils2.default.unique(boundaryPoints.map(function (i) {
      return i.value;
    }));
    var isTerritory = surroundingColors.length === 1 && surroundingColors[0] !== "empty";

    return isTerritory;
  },

  territoryColor: function territoryColor() {
    var point = this.intersections[0];

    var _Region$_startingAt3 = Region._startingAt(this.boardState, point.y, point.x),
        _Region$_startingAt4 = _slicedToArray(_Region$_startingAt3, 2),
        _ = _Region$_startingAt4[0],
        boundaryPoints = _Region$_startingAt4[1];

    var surroundingColors = _utils2.default.unique(boundaryPoints.map(function (i) {
      return i.value;
    }));
    var isTerritory = surroundingColors.length === 1 && surroundingColors[0] !== "empty";

    if (!point.isEmpty() || !isTerritory) {
      throw new Error("Attempted to obtain territory color for something that isn't territory, region containing " + point.y + "," + point.x);
    } else {
      return surroundingColors[0];
    }
  },

  isBlack: function isBlack() {
    return this.territoryColor() === "black";
  },

  isWhite: function isWhite() {
    return this.territoryColor() === "white";
  },

  isNeutral: function isNeutral() {
    return !this.intersections[0].isBlack() && !this.intersections[0].isWhite() && !this.isTerritory();
  },

  exterior: function exterior() {
    var _this = this;

    return this.boardState.intersections.filter(function (i) {
      return _this.intersections.indexOf(i) < 0 && _this.boardState.neighborsFor(i.y, i.x).some(function (neighbor) {
        return _this.intersections.indexOf(neighbor) > -1;
      });
    });
  },

  boundaryStones: function boundaryStones() {
    var _this2 = this;

    if (this._computed.boundaryStones) {
      return this._computed.boundaryStones;
    }

    if (!this.isEmpty()) {
      throw new Error("Attempted to obtain boundary stones for non-empty region");
    }

    this._computed.boundaryStones = this.exterior().filter(function (i) {
      return !i.sameColorAs(_this2.intersections[0]);
    });

    return this._computed.boundaryStones;
  },

  expandedBoundaryStones: function expandedBoundaryStones() {
    if (this._computed.expandedBoundaryStones) {
      return this._computed.expandedBoundaryStones;
    }

    var boundaryStones = this.boundaryStones();
    var regions = Region.allFor(this.boardState).filter(function (r) {
      return r.intersections.some(function (i) {
        return boundaryStones.indexOf(i) > -1;
      });
    });

    this._computed.expandedBoundaryStones = _utils2.default.flatMap(regions, function (r) {
      return r.intersections;
    });

    return this._computed.expandedBoundaryStones;
  },

  lengthOfTerritoryBoundary: function lengthOfTerritoryBoundary() {
    var _this3 = this;

    // count the empty border points to treat the edge of the board itself as points
    var borderPoints = this.intersections.filter(function (i) {
      return i.y === 0 || i.y === _this3.boardState.boardSize - 1 || i.x === 0 || i.x === _this3.boardState.boardSize - 1;
    });
    var cornerPoints = this.intersections.filter(function (i) {
      return i.y % _this3.boardState.boardSize - 1 === 0 && i.x % _this3.boardState.boardSize - 1 === 0;
    });

    return this.boundaryStones().length + borderPoints.length + cornerPoints.length;
  },

  containsSquareFour: function containsSquareFour() {
    var _this4 = this;

    return this.intersections.some(function (i) {
      return [[0, 0], [0, 1], [1, 0], [1, 1]].every(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            yOffset = _ref2[0],
            xOffset = _ref2[1];

        var y = i.y + yOffset;
        var x = i.x + xOffset;

        var onTheBoard = y >= 0 && y < _this4.boardState.boardSize && x >= 0 && x < _this4.boardState.boardSize;

        return onTheBoard && _this4.boardState.intersectionAt(y, x).sameColorAs(i);
      });
    });
  },

  containsCurvedFour: function containsCurvedFour() {
    var _this5 = this;

    return this.intersections.some(function (i) {
      return [[[0, 0], [1, 0], [2, 0], [2, 1]], [[-1, 2], [0, 0], [0, 1], [0, 2]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[-1, 0], [-1, 1], [-1, 2], [0, 0]], [[-2, 1], [-1, 1], [0, 0], [0, 1]], [[0, 0], [1, 0], [1, 1], [1, 2]], [[0, -1], [0, 0], [1, -1], [2, -1]], [[-1, -2], [-1, -1], [-1, 0], [0, 0]]].some(function (expectedPoints) {
        return expectedPoints.every(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              yOffset = _ref4[0],
              xOffset = _ref4[1];

          var y = i.y + yOffset;
          var x = i.x + xOffset;

          var onTheBoard = y >= 0 && y < _this5.boardState.boardSize && x >= 0 && x < _this5.boardState.boardSize;

          return onTheBoard && _this5.boardState.intersectionAt(y, x).sameColorAs(i);
        });
      });
    });
  },

  numberOfEyes: function numberOfEyes() {
    if (!this.intersections[0].isEmpty()) {
      throw new Error("Unexpected calculation of number of eyes for a non-empty region containing " + this.intersections[0].y + "," + this.intersections[0].x);
    }

    var boundaryLength = this.lengthOfTerritoryBoundary();

    if (boundaryLength < 2) {
      throw new Error("Unexpected boundary length of " + boundaryLength + " for region including " + this.intersections[0].y + "," + this.intersections[0].x);
    }

    if (boundaryLength >= 10) {
      return 2;
    }

    var eyes = void 0;

    switch (boundaryLength) {
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        eyes = 1;
        break;
      case 7:
        eyes = 1.5;
        break;
      case 8:
        if (this.containsSquareFour()) {
          eyes = 1;
        } else if (this.containsCurvedFour()) {
          eyes = 2;
        } else {
          eyes = 1.5;
        }

        break;
      case 9:
        if (this.containsSquareFour()) {
          eyes = 1.5;
        } else {
          eyes = 2;
        }
        break;

      default:
        throw new Error("unhandled boundary length " + boundaryLength);
    }

    return eyes;
  }
};

exports.default = Region;

//# sourceMappingURL=region.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lvbi5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl9zbGljZWRUb0FycmF5Iiwic2xpY2VJdGVyYXRvciIsImFyciIsImkiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwidW5kZWZpbmVkIiwiX2kiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zIiwibmV4dCIsImRvbmUiLCJwdXNoIiwibGVuZ3RoIiwiZXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwiX3V0aWxzIiwicmVxdWlyZSIsIl91dGlsczIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJSZWdpb24iLCJib2FyZFN0YXRlIiwiaW50ZXJzZWN0aW9ucyIsIl9jb21wdXRlZCIsImZyZWV6ZSIsIl9zdGFydGluZ0F0IiwieSIsIngiLCJzdGFydGluZ1BvaW50IiwiaW50ZXJzZWN0aW9uQXQiLCJfYm9hcmRTdGF0ZSRwYXJ0aXRpb24iLCJwYXJ0aXRpb25UcmF2ZXJzZSIsIm5laWdoYm9yIiwic2FtZUNvbG9yQXMiLCJfYm9hcmRTdGF0ZSRwYXJ0aXRpb24yIiwiaW5jbHVkZWRQb2ludHMiLCJib3VuZGFyeVBvaW50cyIsImFsbEZvciIsImNoZWNrZWRQb2ludHMiLCJyZWdpb25zIiwiZm9yRWFjaCIsInBvaW50IiwiaW5kZXhPZiIsIl9ib2FyZFN0YXRlJHBhcnRpdGlvbjMiLCJfYm9hcmRTdGF0ZSRwYXJ0aXRpb240IiwicmVnaW9uUG9pbnRzIiwiXyIsImNvbmNhdCIsIm1lcmdlIiwicmVnaW9uIiwibWVyZ2VkUmVnaW9ucyIsImZpbHRlciIsInIiLCJpc0VtcHR5IiwiaXNUZXJyaXRvcnkiLCJ0ZXJyaXRvcnlDb2xvciIsImV4cGFuZGVkQm91bmRhcnlTdG9uZXMiLCJzb21lIiwic3RvbmUiLCJsYXRlc3RSZWdpb24iLCJwcm90b3R5cGUiLCJfUmVnaW9uJF9zdGFydGluZ0F0IiwiX1JlZ2lvbiRfc3RhcnRpbmdBdDIiLCJzdXJyb3VuZGluZ0NvbG9ycyIsInVuaXF1ZSIsIm1hcCIsIl9SZWdpb24kX3N0YXJ0aW5nQXQzIiwiX1JlZ2lvbiRfc3RhcnRpbmdBdDQiLCJFcnJvciIsImlzQmxhY2siLCJpc1doaXRlIiwiaXNOZXV0cmFsIiwiZXh0ZXJpb3IiLCJfdGhpcyIsIm5laWdoYm9yc0ZvciIsImJvdW5kYXJ5U3RvbmVzIiwiX3RoaXMyIiwiZmxhdE1hcCIsImxlbmd0aE9mVGVycml0b3J5Qm91bmRhcnkiLCJfdGhpczMiLCJib3JkZXJQb2ludHMiLCJib2FyZFNpemUiLCJjb3JuZXJQb2ludHMiLCJjb250YWluc1NxdWFyZUZvdXIiLCJfdGhpczQiLCJldmVyeSIsIl9yZWYiLCJfcmVmMiIsInlPZmZzZXQiLCJ4T2Zmc2V0Iiwib25UaGVCb2FyZCIsImNvbnRhaW5zQ3VydmVkRm91ciIsIl90aGlzNSIsImV4cGVjdGVkUG9pbnRzIiwiX3JlZjMiLCJfcmVmNCIsIm51bWJlck9mRXllcyIsImJvdW5kYXJ5TGVuZ3RoIiwiZXllcyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLElBQUlDLGlCQUFpQixZQUFZO0FBQUUsV0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLENBQTVCLEVBQStCO0FBQUUsUUFBSUMsT0FBTyxFQUFYLENBQWUsSUFBSUMsS0FBSyxJQUFULENBQWUsSUFBSUMsS0FBSyxLQUFULENBQWdCLElBQUlDLEtBQUtDLFNBQVQsQ0FBb0IsSUFBSTtBQUFFLFdBQUssSUFBSUMsS0FBS1AsSUFBSVEsT0FBT0MsUUFBWCxHQUFULEVBQWlDQyxFQUF0QyxFQUEwQyxFQUFFUCxLQUFLLENBQUNPLEtBQUtILEdBQUdJLElBQUgsRUFBTixFQUFpQkMsSUFBeEIsQ0FBMUMsRUFBeUVULEtBQUssSUFBOUUsRUFBb0Y7QUFBRUQsYUFB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SSxLQUFLUCxrQkFBTCxFQUFKLEVBQStCO0FBQ3BDTyxpQkFBTyxDQUFQO0FBQ0QsU0FGTSxNQUVBO0FBQ0xBLGlCQUFPLEdBQVA7QUFDRDs7QUFFRDtBQUNGLFdBQUssQ0FBTDtBQUNFLFlBQUksS0FBS2Ysa0JBQUwsRUFBSixFQUErQjtBQUM3QmUsaUJBQU8sR0FBUDtBQUNELFNBRkQsTUFFTztBQUNMQSxpQkFBTyxDQUFQO0FBQ0Q7QUFDRDs7QUFFRjtBQUNFLGNBQU0sSUFBSTlCLEtBQUosQ0FBVSwrQkFBK0I2QixjQUF6QyxDQUFOO0FBOUJKOztBQWlDQSxXQUFPQyxJQUFQO0FBQ0Q7QUFqTmdCLENBQW5COztBQW9OQTVHLFFBQVE2QixPQUFSLEdBQWtCQyxNQUFsQjs7QUFFQSIsImZpbGUiOiJyZWdpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbnZhciBfdXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgUmVnaW9uID0gZnVuY3Rpb24gUmVnaW9uKGJvYXJkU3RhdGUsIGludGVyc2VjdGlvbnMpIHtcbiAgdGhpcy5ib2FyZFN0YXRlID0gYm9hcmRTdGF0ZTtcbiAgdGhpcy5pbnRlcnNlY3Rpb25zID0gaW50ZXJzZWN0aW9ucztcblxuICB0aGlzLl9jb21wdXRlZCA9IHt9O1xuXG4gIE9iamVjdC5mcmVlemUodGhpcyk7XG59O1xuXG5SZWdpb24uX3N0YXJ0aW5nQXQgPSBmdW5jdGlvbiAoYm9hcmRTdGF0ZSwgeSwgeCkge1xuICB2YXIgc3RhcnRpbmdQb2ludCA9IGJvYXJkU3RhdGUuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG5cbiAgdmFyIF9ib2FyZFN0YXRlJHBhcnRpdGlvbiA9IGJvYXJkU3RhdGUucGFydGl0aW9uVHJhdmVyc2Uoc3RhcnRpbmdQb2ludCwgZnVuY3Rpb24gKG5laWdoYm9yKSB7XG4gICAgcmV0dXJuIG5laWdoYm9yLnNhbWVDb2xvckFzKHN0YXJ0aW5nUG9pbnQpO1xuICB9KSxcbiAgICAgIF9ib2FyZFN0YXRlJHBhcnRpdGlvbjIgPSBfc2xpY2VkVG9BcnJheShfYm9hcmRTdGF0ZSRwYXJ0aXRpb24sIDIpLFxuICAgICAgaW5jbHVkZWRQb2ludHMgPSBfYm9hcmRTdGF0ZSRwYXJ0aXRpb24yWzBdLFxuICAgICAgYm91bmRhcnlQb2ludHMgPSBfYm9hcmRTdGF0ZSRwYXJ0aXRpb24yWzFdO1xuXG4gIHJldHVybiBbaW5jbHVkZWRQb2ludHMsIGJvdW5kYXJ5UG9pbnRzXTtcbn07XG5cblJlZ2lvbi5hbGxGb3IgPSBmdW5jdGlvbiAoYm9hcmRTdGF0ZSkge1xuICB2YXIgY2hlY2tlZFBvaW50cyA9IFtdO1xuICB2YXIgcmVnaW9ucyA9IFtdO1xuXG4gIGJvYXJkU3RhdGUuaW50ZXJzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgIGlmIChjaGVja2VkUG9pbnRzLmluZGV4T2YocG9pbnQpID4gLTEpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9ib2FyZFN0YXRlJHBhcnRpdGlvbjMgPSBib2FyZFN0YXRlLnBhcnRpdGlvblRyYXZlcnNlKHBvaW50LCBmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgICAgcmV0dXJuIG5laWdoYm9yLnNhbWVDb2xvckFzKHBvaW50KTtcbiAgICAgIH0pLFxuICAgICAgICAgIF9ib2FyZFN0YXRlJHBhcnRpdGlvbjQgPSBfc2xpY2VkVG9BcnJheShfYm9hcmRTdGF0ZSRwYXJ0aXRpb24zLCAyKSxcbiAgICAgICAgICByZWdpb25Qb2ludHMgPSBfYm9hcmRTdGF0ZSRwYXJ0aXRpb240WzBdLFxuICAgICAgICAgIF8gPSBfYm9hcmRTdGF0ZSRwYXJ0aXRpb240WzFdO1xuXG4gICAgICByZWdpb25zLnB1c2gobmV3IFJlZ2lvbihib2FyZFN0YXRlLCByZWdpb25Qb2ludHMpKTtcbiAgICAgIGNoZWNrZWRQb2ludHMgPSBjaGVja2VkUG9pbnRzLmNvbmNhdChyZWdpb25Qb2ludHMpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlZ2lvbnM7XG59O1xuXG5SZWdpb24ubWVyZ2UgPSBmdW5jdGlvbiAocmVnaW9ucywgcmVnaW9uKSB7XG4gIHZhciBtZXJnZWRSZWdpb25zID0gW3JlZ2lvbl07XG4gIHZhciBsZW5ndGggPSAtMTtcblxuICB3aGlsZSAobWVyZ2VkUmVnaW9ucy5sZW5ndGggIT09IGxlbmd0aCkge1xuICAgIGxlbmd0aCA9IG1lcmdlZFJlZ2lvbnMubGVuZ3RoO1xuXG4gICAgbWVyZ2VkUmVnaW9ucyA9IHJlZ2lvbnMuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pc0VtcHR5KCkgJiYgci5pc1RlcnJpdG9yeSgpICYmIHIudGVycml0b3J5Q29sb3IoKSA9PT0gcmVnaW9uLnRlcnJpdG9yeUNvbG9yKCkgJiYgci5leHBhbmRlZEJvdW5kYXJ5U3RvbmVzKCkuc29tZShmdW5jdGlvbiAoc3RvbmUpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlZFJlZ2lvbnMuc29tZShmdW5jdGlvbiAobGF0ZXN0UmVnaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIGxhdGVzdFJlZ2lvbi5leHBhbmRlZEJvdW5kYXJ5U3RvbmVzKCkuaW5kZXhPZihzdG9uZSkgPiAtMTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBtZXJnZWRSZWdpb25zO1xufTtcblxuUmVnaW9uLnByb3RvdHlwZSA9IHtcbiAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3Rpb25zWzBdLmlzRW1wdHkoKTtcbiAgfSxcblxuICBpc1RlcnJpdG9yeTogZnVuY3Rpb24gaXNUZXJyaXRvcnkoKSB7XG4gICAgdmFyIHBvaW50ID0gdGhpcy5pbnRlcnNlY3Rpb25zWzBdO1xuXG4gICAgaWYgKCFwb2ludC5pc0VtcHR5KCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgX1JlZ2lvbiRfc3RhcnRpbmdBdCA9IFJlZ2lvbi5fc3RhcnRpbmdBdCh0aGlzLmJvYXJkU3RhdGUsIHBvaW50LnksIHBvaW50LngpLFxuICAgICAgICBfUmVnaW9uJF9zdGFydGluZ0F0MiA9IF9zbGljZWRUb0FycmF5KF9SZWdpb24kX3N0YXJ0aW5nQXQsIDIpLFxuICAgICAgICBfID0gX1JlZ2lvbiRfc3RhcnRpbmdBdDJbMF0sXG4gICAgICAgIGJvdW5kYXJ5UG9pbnRzID0gX1JlZ2lvbiRfc3RhcnRpbmdBdDJbMV07XG5cbiAgICB2YXIgc3Vycm91bmRpbmdDb2xvcnMgPSBfdXRpbHMyLmRlZmF1bHQudW5pcXVlKGJvdW5kYXJ5UG9pbnRzLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIGkudmFsdWU7XG4gICAgfSkpO1xuICAgIHZhciBpc1RlcnJpdG9yeSA9IHN1cnJvdW5kaW5nQ29sb3JzLmxlbmd0aCA9PT0gMSAmJiBzdXJyb3VuZGluZ0NvbG9yc1swXSAhPT0gXCJlbXB0eVwiO1xuXG4gICAgcmV0dXJuIGlzVGVycml0b3J5O1xuICB9LFxuXG4gIHRlcnJpdG9yeUNvbG9yOiBmdW5jdGlvbiB0ZXJyaXRvcnlDb2xvcigpIHtcbiAgICB2YXIgcG9pbnQgPSB0aGlzLmludGVyc2VjdGlvbnNbMF07XG5cbiAgICB2YXIgX1JlZ2lvbiRfc3RhcnRpbmdBdDMgPSBSZWdpb24uX3N0YXJ0aW5nQXQodGhpcy5ib2FyZFN0YXRlLCBwb2ludC55LCBwb2ludC54KSxcbiAgICAgICAgX1JlZ2lvbiRfc3RhcnRpbmdBdDQgPSBfc2xpY2VkVG9BcnJheShfUmVnaW9uJF9zdGFydGluZ0F0MywgMiksXG4gICAgICAgIF8gPSBfUmVnaW9uJF9zdGFydGluZ0F0NFswXSxcbiAgICAgICAgYm91bmRhcnlQb2ludHMgPSBfUmVnaW9uJF9zdGFydGluZ0F0NFsxXTtcblxuICAgIHZhciBzdXJyb3VuZGluZ0NvbG9ycyA9IF91dGlsczIuZGVmYXVsdC51bmlxdWUoYm91bmRhcnlQb2ludHMubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gaS52YWx1ZTtcbiAgICB9KSk7XG4gICAgdmFyIGlzVGVycml0b3J5ID0gc3Vycm91bmRpbmdDb2xvcnMubGVuZ3RoID09PSAxICYmIHN1cnJvdW5kaW5nQ29sb3JzWzBdICE9PSBcImVtcHR5XCI7XG5cbiAgICBpZiAoIXBvaW50LmlzRW1wdHkoKSB8fCAhaXNUZXJyaXRvcnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF0dGVtcHRlZCB0byBvYnRhaW4gdGVycml0b3J5IGNvbG9yIGZvciBzb21ldGhpbmcgdGhhdCBpc24ndCB0ZXJyaXRvcnksIHJlZ2lvbiBjb250YWluaW5nIFwiICsgcG9pbnQueSArIFwiLFwiICsgcG9pbnQueCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXJyb3VuZGluZ0NvbG9yc1swXTtcbiAgICB9XG4gIH0sXG5cbiAgaXNCbGFjazogZnVuY3Rpb24gaXNCbGFjaygpIHtcbiAgICByZXR1cm4gdGhpcy50ZXJyaXRvcnlDb2xvcigpID09PSBcImJsYWNrXCI7XG4gIH0sXG5cbiAgaXNXaGl0ZTogZnVuY3Rpb24gaXNXaGl0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXJyaXRvcnlDb2xvcigpID09PSBcIndoaXRlXCI7XG4gIH0sXG5cbiAgaXNOZXV0cmFsOiBmdW5jdGlvbiBpc05ldXRyYWwoKSB7XG4gICAgcmV0dXJuICF0aGlzLmludGVyc2VjdGlvbnNbMF0uaXNCbGFjaygpICYmICF0aGlzLmludGVyc2VjdGlvbnNbMF0uaXNXaGl0ZSgpICYmICF0aGlzLmlzVGVycml0b3J5KCk7XG4gIH0sXG5cbiAgZXh0ZXJpb3I6IGZ1bmN0aW9uIGV4dGVyaW9yKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5ib2FyZFN0YXRlLmludGVyc2VjdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gX3RoaXMuaW50ZXJzZWN0aW9ucy5pbmRleE9mKGkpIDwgMCAmJiBfdGhpcy5ib2FyZFN0YXRlLm5laWdoYm9yc0ZvcihpLnksIGkueCkuc29tZShmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLmludGVyc2VjdGlvbnMuaW5kZXhPZihuZWlnaGJvcikgPiAtMTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIGJvdW5kYXJ5U3RvbmVzOiBmdW5jdGlvbiBib3VuZGFyeVN0b25lcygpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICh0aGlzLl9jb21wdXRlZC5ib3VuZGFyeVN0b25lcykge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVkLmJvdW5kYXJ5U3RvbmVzO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF0dGVtcHRlZCB0byBvYnRhaW4gYm91bmRhcnkgc3RvbmVzIGZvciBub24tZW1wdHkgcmVnaW9uXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbXB1dGVkLmJvdW5kYXJ5U3RvbmVzID0gdGhpcy5leHRlcmlvcigpLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuICFpLnNhbWVDb2xvckFzKF90aGlzMi5pbnRlcnNlY3Rpb25zWzBdKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9jb21wdXRlZC5ib3VuZGFyeVN0b25lcztcbiAgfSxcblxuICBleHBhbmRlZEJvdW5kYXJ5U3RvbmVzOiBmdW5jdGlvbiBleHBhbmRlZEJvdW5kYXJ5U3RvbmVzKCkge1xuICAgIGlmICh0aGlzLl9jb21wdXRlZC5leHBhbmRlZEJvdW5kYXJ5U3RvbmVzKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcHV0ZWQuZXhwYW5kZWRCb3VuZGFyeVN0b25lcztcbiAgICB9XG5cbiAgICB2YXIgYm91bmRhcnlTdG9uZXMgPSB0aGlzLmJvdW5kYXJ5U3RvbmVzKCk7XG4gICAgdmFyIHJlZ2lvbnMgPSBSZWdpb24uYWxsRm9yKHRoaXMuYm9hcmRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zLnNvbWUoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIGJvdW5kYXJ5U3RvbmVzLmluZGV4T2YoaSkgPiAtMTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY29tcHV0ZWQuZXhwYW5kZWRCb3VuZGFyeVN0b25lcyA9IF91dGlsczIuZGVmYXVsdC5mbGF0TWFwKHJlZ2lvbnMsIGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVkLmV4cGFuZGVkQm91bmRhcnlTdG9uZXM7XG4gIH0sXG5cbiAgbGVuZ3RoT2ZUZXJyaXRvcnlCb3VuZGFyeTogZnVuY3Rpb24gbGVuZ3RoT2ZUZXJyaXRvcnlCb3VuZGFyeSgpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIC8vIGNvdW50IHRoZSBlbXB0eSBib3JkZXIgcG9pbnRzIHRvIHRyZWF0IHRoZSBlZGdlIG9mIHRoZSBib2FyZCBpdHNlbGYgYXMgcG9pbnRzXG4gICAgdmFyIGJvcmRlclBvaW50cyA9IHRoaXMuaW50ZXJzZWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBpLnkgPT09IDAgfHwgaS55ID09PSBfdGhpczMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxIHx8IGkueCA9PT0gMCB8fCBpLnggPT09IF90aGlzMy5ib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDE7XG4gICAgfSk7XG4gICAgdmFyIGNvcm5lclBvaW50cyA9IHRoaXMuaW50ZXJzZWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBpLnkgJSBfdGhpczMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxID09PSAwICYmIGkueCAlIF90aGlzMy5ib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEgPT09IDA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5ib3VuZGFyeVN0b25lcygpLmxlbmd0aCArIGJvcmRlclBvaW50cy5sZW5ndGggKyBjb3JuZXJQb2ludHMubGVuZ3RoO1xuICB9LFxuXG4gIGNvbnRhaW5zU3F1YXJlRm91cjogZnVuY3Rpb24gY29udGFpbnNTcXVhcmVGb3VyKCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9ucy5zb21lKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gW1swLCAwXSwgWzAsIDFdLCBbMSwgMF0sIFsxLCAxXV0uZXZlcnkoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgdmFyIF9yZWYyID0gX3NsaWNlZFRvQXJyYXkoX3JlZiwgMiksXG4gICAgICAgICAgICB5T2Zmc2V0ID0gX3JlZjJbMF0sXG4gICAgICAgICAgICB4T2Zmc2V0ID0gX3JlZjJbMV07XG5cbiAgICAgICAgdmFyIHkgPSBpLnkgKyB5T2Zmc2V0O1xuICAgICAgICB2YXIgeCA9IGkueCArIHhPZmZzZXQ7XG5cbiAgICAgICAgdmFyIG9uVGhlQm9hcmQgPSB5ID49IDAgJiYgeSA8IF90aGlzNC5ib2FyZFN0YXRlLmJvYXJkU2l6ZSAmJiB4ID49IDAgJiYgeCA8IF90aGlzNC5ib2FyZFN0YXRlLmJvYXJkU2l6ZTtcblxuICAgICAgICByZXR1cm4gb25UaGVCb2FyZCAmJiBfdGhpczQuYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25BdCh5LCB4KS5zYW1lQ29sb3JBcyhpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIGNvbnRhaW5zQ3VydmVkRm91cjogZnVuY3Rpb24gY29udGFpbnNDdXJ2ZWRGb3VyKCkge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9ucy5zb21lKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gW1tbMCwgMF0sIFsxLCAwXSwgWzIsIDBdLCBbMiwgMV1dLCBbWy0xLCAyXSwgWzAsIDBdLCBbMCwgMV0sIFswLCAyXV0sIFtbMCwgMF0sIFswLCAxXSwgWzEsIDFdLCBbMiwgMV1dLCBbWy0xLCAwXSwgWy0xLCAxXSwgWy0xLCAyXSwgWzAsIDBdXSwgW1stMiwgMV0sIFstMSwgMV0sIFswLCAwXSwgWzAsIDFdXSwgW1swLCAwXSwgWzEsIDBdLCBbMSwgMV0sIFsxLCAyXV0sIFtbMCwgLTFdLCBbMCwgMF0sIFsxLCAtMV0sIFsyLCAtMV1dLCBbWy0xLCAtMl0sIFstMSwgLTFdLCBbLTEsIDBdLCBbMCwgMF1dXS5zb21lKGZ1bmN0aW9uIChleHBlY3RlZFBvaW50cykge1xuICAgICAgICByZXR1cm4gZXhwZWN0ZWRQb2ludHMuZXZlcnkoZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgICAgdmFyIF9yZWY0ID0gX3NsaWNlZFRvQXJyYXkoX3JlZjMsIDIpLFxuICAgICAgICAgICAgICB5T2Zmc2V0ID0gX3JlZjRbMF0sXG4gICAgICAgICAgICAgIHhPZmZzZXQgPSBfcmVmNFsxXTtcblxuICAgICAgICAgIHZhciB5ID0gaS55ICsgeU9mZnNldDtcbiAgICAgICAgICB2YXIgeCA9IGkueCArIHhPZmZzZXQ7XG5cbiAgICAgICAgICB2YXIgb25UaGVCb2FyZCA9IHkgPj0gMCAmJiB5IDwgX3RoaXM1LmJvYXJkU3RhdGUuYm9hcmRTaXplICYmIHggPj0gMCAmJiB4IDwgX3RoaXM1LmJvYXJkU3RhdGUuYm9hcmRTaXplO1xuXG4gICAgICAgICAgcmV0dXJuIG9uVGhlQm9hcmQgJiYgX3RoaXM1LmJvYXJkU3RhdGUuaW50ZXJzZWN0aW9uQXQoeSwgeCkuc2FtZUNvbG9yQXMoaSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgbnVtYmVyT2ZFeWVzOiBmdW5jdGlvbiBudW1iZXJPZkV5ZXMoKSB7XG4gICAgaWYgKCF0aGlzLmludGVyc2VjdGlvbnNbMF0uaXNFbXB0eSgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGNhbGN1bGF0aW9uIG9mIG51bWJlciBvZiBleWVzIGZvciBhIG5vbi1lbXB0eSByZWdpb24gY29udGFpbmluZyBcIiArIHRoaXMuaW50ZXJzZWN0aW9uc1swXS55ICsgXCIsXCIgKyB0aGlzLmludGVyc2VjdGlvbnNbMF0ueCk7XG4gICAgfVxuXG4gICAgdmFyIGJvdW5kYXJ5TGVuZ3RoID0gdGhpcy5sZW5ndGhPZlRlcnJpdG9yeUJvdW5kYXJ5KCk7XG5cbiAgICBpZiAoYm91bmRhcnlMZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGJvdW5kYXJ5IGxlbmd0aCBvZiBcIiArIGJvdW5kYXJ5TGVuZ3RoICsgXCIgZm9yIHJlZ2lvbiBpbmNsdWRpbmcgXCIgKyB0aGlzLmludGVyc2VjdGlvbnNbMF0ueSArIFwiLFwiICsgdGhpcy5pbnRlcnNlY3Rpb25zWzBdLngpO1xuICAgIH1cblxuICAgIGlmIChib3VuZGFyeUxlbmd0aCA+PSAxMCkge1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuXG4gICAgdmFyIGV5ZXMgPSB2b2lkIDA7XG5cbiAgICBzd2l0Y2ggKGJvdW5kYXJ5TGVuZ3RoKSB7XG4gICAgICBjYXNlIDI6XG4gICAgICBjYXNlIDM6XG4gICAgICBjYXNlIDQ6XG4gICAgICBjYXNlIDU6XG4gICAgICBjYXNlIDY6XG4gICAgICAgIGV5ZXMgPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgZXllcyA9IDEuNTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5zU3F1YXJlRm91cigpKSB7XG4gICAgICAgICAgZXllcyA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluc0N1cnZlZEZvdXIoKSkge1xuICAgICAgICAgIGV5ZXMgPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV5ZXMgPSAxLjU7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbnNTcXVhcmVGb3VyKCkpIHtcbiAgICAgICAgICBleWVzID0gMS41O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV5ZXMgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmhhbmRsZWQgYm91bmRhcnkgbGVuZ3RoIFwiICsgYm91bmRhcnlMZW5ndGgpO1xuICAgIH1cblxuICAgIHJldHVybiBleWVzO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSZWdpb247XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZ2lvbi5qcy5tYXAiXX0=
},{"./utils":14}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Renderer = function Renderer(boardElement, _ref) {
  var hooks = _ref.hooks,
      options = _ref.options;

  this.INTERSECTION_GAP_SIZE = 28;
  this.GUTTER_MARGIN = this.INTERSECTION_GAP_SIZE - 3;
  this.BASE_MARGIN = this.INTERSECTION_GAP_SIZE - 10;
  this.hasCoordinates = boardElement.hasAttribute("data-include-coordinates");
  this.MARGIN = this.hasCoordinates ? this.BASE_MARGIN + this.GUTTER_MARGIN : this.BASE_MARGIN;
  this.boardElement = boardElement;
  this.grid = [];
  this.hooks = hooks || {};
  this._options = options || {};
  this._initialized = false;

  if (this._options["fuzzyStonePlacement"]) {
    _utils2.default.addClass(boardElement, "tenuki-fuzzy-placement");
    _utils2.default.removeClass(boardElement, "tenuki-board-flat");
    _utils2.default.addClass(boardElement, "tenuki-board-nonflat");
    this.smallerStones = true;
  }

  this.flatStones = _utils2.default.hasClass(boardElement, "tenuki-board-flat");

  if (!this.flatStones) {
    _utils2.default.addClass(boardElement, "tenuki-board-nonflat");
  }
};

Renderer.hoshiPositionsFor = function (boardSize) {
  var hoshiElements = [];

  if (boardSize < 7) {
    if (boardSize > 1 && boardSize % 2 === 1) {
      var hoshi = {};
      hoshi.top = (boardSize - 1) / 2;
      hoshi.left = hoshi.top;

      hoshiElements.push(hoshi);
    } else {
      // no hoshi
    }
  } else {
    var hoshiOffset = boardSize > 11 ? 3 : 2;

    for (var hoshiY = 0; hoshiY < 3; hoshiY++) {
      for (var hoshiX = 0; hoshiX < 3; hoshiX++) {
        if ((boardSize === 7 || boardSize % 2 === 0) && (hoshiY === 1 || hoshiX === 1)) {
          continue;
        }

        var _hoshi = {};

        if (hoshiY === 0) {
          _hoshi.top = hoshiOffset;
        }

        if (hoshiY === 1) {
          _hoshi.top = (boardSize + 1) / 2 - 1;
        }

        if (hoshiY === 2) {
          _hoshi.top = boardSize - hoshiOffset - 1;
        }

        if (hoshiX === 0) {
          _hoshi.left = hoshiOffset;
        }

        if (hoshiX === 1) {
          _hoshi.left = (boardSize + 1) / 2 - 1;
        }

        if (hoshiX === 2) {
          _hoshi.left = boardSize - hoshiOffset - 1;
        }

        hoshiElements.push(_hoshi);
      }
    }
  }

  return hoshiElements;
};

Renderer.prototype = {
  _setup: function _setup(boardState) {
    var renderer = this;
    var boardElement = this.boardElement;

    renderer.BOARD_LENGTH = 2 * this.MARGIN + (boardState.boardSize - 1) * (this.INTERSECTION_GAP_SIZE + 1);

    var innerContainer = _utils2.default.createElement("div", { class: "tenuki-inner-container" });
    renderer.innerContainer = innerContainer;
    _utils2.default.appendElement(boardElement, innerContainer);

    var zoomContainer = _utils2.default.createElement("div", { class: "tenuki-zoom-container" });
    renderer.zoomContainer = zoomContainer;
    _utils2.default.appendElement(innerContainer, zoomContainer);

    renderer.cancelZoomElement = _utils2.default.createElement("div", { class: "cancel-zoom" });
    var cancelZoomBackdrop = _utils2.default.createElement("div", { class: "cancel-zoom-backdrop" });
    _utils2.default.addEventListener(renderer.cancelZoomElement, "click", function (event) {
      event.preventDefault();
      renderer.zoomOut();

      return false;
    });
    _utils2.default.addEventListener(cancelZoomBackdrop, "click", function (event) {
      event.preventDefault();
      renderer.zoomOut();

      return false;
    });
    _utils2.default.appendElement(innerContainer, renderer.cancelZoomElement);
    _utils2.default.appendElement(innerContainer, cancelZoomBackdrop);

    // https://developer.mozilla.org/en-US/docs/Web/Events/resize
    var throttle = function throttle(type, name) {
      var running = false;
      var func = function func() {
        if (running) {
          return;
        }

        running = true;

        window.requestAnimationFrame(function () {
          window.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      window.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");

    var specificRendererBoard = this.generateBoard(boardState, {
      hasCoordinates: this.hasCoordinates,
      smallerStones: this.smallerStones,
      flatStones: this.flatStones
    });
    _utils2.default.appendElement(zoomContainer, specificRendererBoard);

    window.requestAnimationFrame(function () {
      // we'll potentially be zooming on touch devices
      zoomContainer.style.willChange = "transform";

      renderer.computeSizing();
    });

    window.addEventListener("optimizedResize", function () {
      renderer.computeSizing();
    });

    renderer.touchmoveChangedTouch = null;
    renderer.touchstartEventHandler = renderer.handleTouchStart.bind(renderer);
    renderer.touchmoveEventHandler = renderer.handleTouchMove.bind(renderer);
    renderer.touchendEventHandler = renderer.handleTouchEnd.bind(renderer);

    _utils2.default.addEventListener(renderer.innerContainer, "touchstart", renderer.touchstartEventHandler);
    _utils2.default.addEventListener(renderer.innerContainer, "touchend", renderer.touchendEventHandler);
    _utils2.default.addEventListener(renderer.innerContainer, "touchmove", renderer.touchmoveEventHandler);
  },

  computeSizing: function computeSizing() {
    var renderer = this;
    var innerContainer = this.innerContainer;
    var zoomContainer = this.zoomContainer;
    var boardElement = this.boardElement;

    // reset everything so we can calculate against new values
    innerContainer.style.height = "";
    innerContainer.style.width = "";
    zoomContainer.style.height = "";
    zoomContainer.style.width = "";
    innerContainer.style.transform = "";
    // zoomContainer.style.willChange = "";
    boardElement.style.width = "";
    boardElement.style.height = "";

    // dev-friendly reset of whether this is a touch device
    renderer._touchEventFired = null;

    innerContainer.style.width = renderer.BOARD_LENGTH + "px";
    innerContainer.style.height = renderer.BOARD_LENGTH + "px";

    zoomContainer.style.width = renderer.BOARD_LENGTH + "px";
    zoomContainer.style.height = renderer.BOARD_LENGTH + "px";

    var scaleX = innerContainer.parentNode.clientWidth / innerContainer.clientWidth;
    var scaleY = innerContainer.parentNode.clientHeight / innerContainer.clientHeight;
    var scale = Math.min(scaleX, scaleY);

    if (scale > 0) {
      if (scale < 1) {
        _utils2.default.addClass(boardElement, "tenuki-scaled");
      } else {
        _utils2.default.removeClass(boardElement, "tenuki-scaled");
      }

      if (scale < 1 || scale > 1) {
        innerContainer.style["transform-origin"] = "top left";
        innerContainer.style.transform = "scale3d(" + scale + ", " + scale + ", 1)";
      }
    }

    // reset the outer element's height to match, ensuring that we free up any lingering whitespace
    boardElement.style.width = innerContainer.getBoundingClientRect().width + "px";
    boardElement.style.height = innerContainer.getBoundingClientRect().height + "px";

    // Work around lack of re-raster in Chrome. See https://github.com/w3c/csswg-drafts/issues/236
    // and https://bugs.chromium.org/p/chromium/issues/detail?id=600482 for more
    // information. This is preventing, e.g., horizontal/vertical line width
    // mismatches after scaling. By adding this, lines are re-rastered and are
    // all the same width, as if the user had hit refresh at the new viewport
    // size.
    zoomContainer.style.willChange = "";

    window.requestAnimationFrame(function () {
      zoomContainer.style.willChange = "transform";
    });
  },

  addIntersectionEventListeners: function addIntersectionEventListeners(element, y, x) {
    var renderer = this;

    _utils2.default.addEventListener(element, "mouseenter", function () {
      var hoveredYPosition = y;
      var hoveredXPosition = x;
      var hoverValue = renderer.hooks.hoverValue(hoveredYPosition, hoveredXPosition);

      if (hoverValue) {
        _utils2.default.addClass(element, "hovered");
        _utils2.default.addClass(element, hoverValue);
      }
    });

    _utils2.default.addEventListener(element, "mouseleave", function () {
      if (_utils2.default.hasClass(this, "hovered")) {
        _utils2.default.removeClass(element, "hovered");
        _utils2.default.removeClass(element, "black");
        _utils2.default.removeClass(element, "white");
      }

      renderer.resetTouchedPoint();
    });

    _utils2.default.addEventListener(element, "click", function () {
      var playedYPosition = y;
      var playedXPosition = x;

      // if this isn't part of a touch,
      // or it is and the user is zoomed in,
      // or it's game over and we're marking stones dead,
      // then don't use the zoom/double-select system.
      if (!renderer._touchEventFired || document.body.clientWidth / window.innerWidth > 1 || renderer.hooks.gameIsOver()) {
        renderer.hooks.handleClick(playedYPosition, playedXPosition);
        return;
      }

      if (renderer.touchedPoint) {
        if (element === renderer.touchedPoint) {
          renderer.hooks.handleClick(playedYPosition, playedXPosition);
        } else {
          renderer.showPossibleMoveAt(element, playedYPosition, playedXPosition);
        }
      } else {
        renderer.showPossibleMoveAt(element, playedYPosition, playedXPosition);
      }
    });
  },

  handleTouchStart: function handleTouchStart(event) {
    var renderer = this;
    renderer._touchEventFired = true;

    if (event.touches.length > 1) {
      if (renderer.zoomedIn) {
        event.preventDefault();
      }
      return;
    }

    if (!renderer.zoomedIn) {
      return;
    }

    var xCursor = event.changedTouches[0].clientX;
    var yCursor = event.changedTouches[0].clientY;

    renderer.dragStartX = xCursor;
    renderer.dragStartY = yCursor;
    renderer.zoomContainer.style.transition = "none";
    renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
  },

  handleTouchMove: function handleTouchMove(event) {
    var renderer = this;

    if (event.touches.length > 1) {
      return;
    }

    if (!renderer.zoomedIn) {
      return true;
    }

    // prevent pull-to-refresh
    event.preventDefault();

    renderer.touchmoveChangedTouch = event.changedTouches[0];

    renderer.moveInProgress = true;
  },

  handleTouchEnd: function handleTouchEnd(event) {
    var renderer = this;

    if (event.touches.length > 1) {
      return;
    }

    if (!renderer.zoomedIn) {
      return;
    }

    renderer.zoomContainer.style.transition = "";

    if (!renderer.moveInProgress) {
      return;
    }
    renderer.translateY = renderer.lastTranslateY;
    renderer.translateX = renderer.lastTranslateX;
    renderer.moveInProgress = false;
    renderer.touchmoveChangedTouch = null;
    window.cancelAnimationFrame(renderer.animationFrameRequestID);
  },

  processDragDelta: function processDragDelta() {
    var renderer = this;

    if (!renderer.touchmoveChangedTouch) {
      renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
      return;
    }

    var innerContainer = renderer.innerContainer;

    var xCursor = renderer.touchmoveChangedTouch.clientX;
    var yCursor = renderer.touchmoveChangedTouch.clientY;

    var deltaX = xCursor - renderer.dragStartX;
    var deltaY = yCursor - renderer.dragStartY;

    var translateY = renderer.translateY + deltaY / 2.5;
    var translateX = renderer.translateX + deltaX / 2.5;

    if (translateY > 0.5 * innerContainer.clientHeight - renderer.MARGIN) {
      translateY = 0.5 * innerContainer.clientHeight - renderer.MARGIN;
    }

    if (translateX > 0.5 * innerContainer.clientWidth - renderer.MARGIN) {
      translateX = 0.5 * innerContainer.clientWidth - renderer.MARGIN;
    }

    if (translateY < -0.5 * innerContainer.clientHeight + renderer.MARGIN) {
      translateY = -0.5 * innerContainer.clientHeight + renderer.MARGIN;
    }

    if (translateX < -0.5 * innerContainer.clientWidth + renderer.MARGIN) {
      translateX = -0.5 * innerContainer.clientWidth + renderer.MARGIN;
    }

    renderer.zoomContainer.style.transform = "translate3d(" + 2.5 * translateX + "px, " + 2.5 * translateY + "px, 0) scale3d(2.5, 2.5, 1)";

    renderer.lastTranslateX = translateX;
    renderer.lastTranslateY = translateY;

    renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
  },

  showPossibleMoveAt: function showPossibleMoveAt(intersectionElement, y, x) {
    var renderer = this;
    var boardElement = this.boardElement;
    var zoomContainer = this.zoomContainer;

    renderer.zoomContainerHeight = renderer.zoomContainerHeight || zoomContainer.clientHeight;
    renderer.zoomContainerWidth = renderer.zoomContainerWidth || zoomContainer.clientWidth;

    renderer.touchedPoint = intersectionElement;

    if (_utils2.default.hasClass(boardElement, "tenuki-scaled")) {
      var top = y * (this.INTERSECTION_GAP_SIZE + 1);
      var left = x * (this.INTERSECTION_GAP_SIZE + 1);

      var translateY = 0.5 * renderer.zoomContainerHeight - top - renderer.MARGIN;
      var translateX = 0.5 * renderer.zoomContainerWidth - left - renderer.MARGIN;

      zoomContainer.style.transform = "translate3d(" + 2.5 * translateX + "px, " + 2.5 * translateY + "px, 0) scale3d(2.5, 2.5, 1)";
      renderer.translateY = translateY;
      renderer.translateX = translateX;

      _utils2.default.addClass(renderer.cancelZoomElement, "visible");
      renderer.zoomedIn = true;
    }
  },

  resetTouchedPoint: function resetTouchedPoint() {
    var renderer = this;

    renderer.touchedPoint = null;
  },

  zoomOut: function zoomOut() {
    var renderer = this;

    this.resetTouchedPoint();
    renderer.zoomContainer.style.transform = "";
    renderer.zoomContainer.style.transition = "";
    renderer.dragStartX = null;
    renderer.dragStartY = null;
    renderer.translateY = null;
    renderer.translateX = null;
    renderer.lastTranslateX = null;
    renderer.lastTranslateY = null;

    _utils2.default.removeClass(renderer.cancelZoomElement, "visible");
    renderer.zoomedIn = false;
  },

  render: function render(boardState) {
    var _this = this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        territory = _ref2.territory,
        deadStones = _ref2.deadStones;

    if (!this._initialized) {
      this._setup(boardState);
      this._initialized = true;
    }

    this.resetTouchedPoint();

    this.renderStonesPlayed(boardState.intersections);

    var playedPoint = boardState.hidePlayedPoint ? null : boardState.playedPoint;

    this.updateMarkerPoints({ playedPoint: playedPoint, koPoint: boardState.koPoint, labelPoint: boardState.labelPoint, labelType: boardState.labelType });

    if (this._options["fuzzyStonePlacement"] && playedPoint) {
      var verticalShiftClasses = ["v-shift-up", "v-shift-upup", "v-shift-down", "v-shift-downdown", "v-shift-none"];

      var horizontalShiftClasses = ["h-shift-left", "h-shift-leftleft", "h-shift-right", "h-shift-rightright", "h-shift-none"];

      var shiftClasses = verticalShiftClasses.concat(horizontalShiftClasses);

      var alreadyShifted = shiftClasses.some(function (c) {
        return _utils2.default.hasClass(_this.grid[playedPoint.y][playedPoint.x], c);
      });

      if (!alreadyShifted) {
        var possibleShifts = _utils2.default.cartesianProduct(verticalShiftClasses, horizontalShiftClasses);

        var _possibleShifts$Math$ = _slicedToArray(possibleShifts[Math.floor(Math.random() * possibleShifts.length)], 2),
            playedVerticalShift = _possibleShifts$Math$[0],
            playedHorizontalShift = _possibleShifts$Math$[1];

        [[-1, 0], [0, -1], [0, 1], [1, 0]].forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              y = _ref4[0],
              x = _ref4[1];

          if (_this.grid[playedPoint.y + y] && _this.grid[playedPoint.y + y][playedPoint.x + x]) {
            var neighboringElement = _this.grid[playedPoint.y + y][playedPoint.x + x];

            if (!_utils2.default.hasClass(neighboringElement, "empty")) {
              [[-1, 0, "v-shift-downdown", "v-shift-up", "v-shift-down"], [-1, 0, "v-shift-downdown", "v-shift-upup", "v-shift-none"], [-1, 0, "v-shift-down", "v-shift-upup", "v-shift-none"], [1, 0, "v-shift-upup", "v-shift-down", "v-shift-up"], [1, 0, "v-shift-upup", "v-shift-downdown", "v-shift-none"], [1, 0, "v-shift-up", "v-shift-downdown", "v-shift-none"], [0, -1, "h-shift-rightright", "h-shift-left", "h-shift-right"], [0, -1, "h-shift-rightright", "h-shift-leftleft", "h-shift-none"], [0, -1, "h-shift-right", "h-shift-leftleft", "h-shift-none"], [0, 1, "h-shift-leftleft", "h-shift-right", "h-shift-left"], [0, 1, "h-shift-leftleft", "h-shift-rightright", "h-shift-none"], [0, 1, "h-shift-left", "h-shift-rightright", "h-shift-none"]].forEach(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 5),
                    requiredYOffset = _ref6[0],
                    requiredXOffset = _ref6[1],
                    requiredNeighborShift = _ref6[2],
                    conflictingPlayedShift = _ref6[3],
                    newNeighborShift = _ref6[4];

                if (y === requiredYOffset && x === requiredXOffset && _utils2.default.hasClass(neighboringElement, requiredNeighborShift) && (playedVerticalShift === conflictingPlayedShift || playedHorizontalShift === conflictingPlayedShift)) {
                  _utils2.default.removeClass(neighboringElement, requiredNeighborShift);
                  _utils2.default.addClass(neighboringElement, newNeighborShift);
                }
              });
            }
          }
        });

        _utils2.default.addClass(this.grid[playedPoint.y][playedPoint.x], playedVerticalShift);
        _utils2.default.addClass(this.grid[playedPoint.y][playedPoint.x], playedHorizontalShift);
      }
    }

    if (deadStones.length > 0 || territory.black.length > 0 || territory.white.length > 0) {
      this.renderTerritory(territory, deadStones);
    }
  },

  renderStonesPlayed: function renderStonesPlayed(intersections) {
    var _this2 = this;

    intersections.forEach(function (intersection) {
      _this2.renderIntersection(intersection);
    });
  },

  updateMarkerPoints: function updateMarkerPoints(_ref7) {
    var playedPoint = _ref7.playedPoint,
        koPoint = _ref7.koPoint,
        labelPoint = _ref7.labelPoint,
        labelType = _ref7.labelType;

    var renderer = this;

    if (koPoint) {
      _utils2.default.addClass(renderer.grid[koPoint.y][koPoint.x], "ko");
    }

    if (playedPoint) {
      _utils2.default.addClass(renderer.grid[playedPoint.y][playedPoint.x], "played");
    }

    if (labelPoint) {
      _utils2.default.addClass(renderer.grid[labelPoint.y][labelPoint.x], labelType);
    }
  },

  renderIntersection: function renderIntersection(intersection) {
    var renderer = this;

    var intersectionEl = renderer.grid[intersection.y][intersection.x];

    var classes = ["intersection"];

    if (intersection.hasLabel()) {
      classes.push(intersection.getLabel());
    }

    if (intersection.isEmpty()) {
      classes.push("empty");
    } else {
      classes.push("occupied");

      if (intersection.isBlack()) {
        classes.push("black");
      } else {
        classes.push("white");
      }

      var shiftClasses = ["v-shift-up", "v-shift-upup", "v-shift-down", "v-shift-downdown", "v-shift-none", "h-shift-left", "h-shift-leftleft", "h-shift-right", "h-shift-rightright", "h-shift-none"];

      shiftClasses.forEach(function (shiftClass) {
        if (_utils2.default.hasClass(intersectionEl, shiftClass)) {
          classes.push(shiftClass);
        }
      });
    }

    this.setIntersectionClasses(intersectionEl, intersection, classes);
  },

  renderTerritory: function renderTerritory(territory, deadStones) {
    var _this3 = this;

    _utils2.default.flatten(this.grid).forEach(function (element) {
      _utils2.default.removeClass(element, "territory-black");
      _utils2.default.removeClass(element, "territory-white");
      _utils2.default.removeClass(element, "dead");
    });

    deadStones.forEach(function (point) {
      _utils2.default.addClass(_this3.grid[point.y][point.x], "dead");
    });

    territory.black.forEach(function (territoryPoint) {
      _utils2.default.addClass(_this3.grid[territoryPoint.y][territoryPoint.x], "territory-black");
    });

    territory.white.forEach(function (territoryPoint) {
      _utils2.default.addClass(_this3.grid[territoryPoint.y][territoryPoint.x], "territory-white");
    });
  }
};

exports.default = Renderer;

//# sourceMappingURL=renderer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiYXJyIiwiaSIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJ1bmRlZmluZWQiLCJfaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3MiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJsZW5ndGgiLCJlcnIiLCJBcnJheSIsImlzQXJyYXkiLCJUeXBlRXJyb3IiLCJfdXRpbHMiLCJyZXF1aXJlIiwiX3V0aWxzMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIlJlbmRlcmVyIiwiYm9hcmRFbGVtZW50IiwiX3JlZiIsImhvb2tzIiwib3B0aW9ucyIsIklOVEVSU0VDVElPTl9HQVBfU0laRSIsIkdVVFRFUl9NQVJHSU4iLCJCQVNFX01BUkdJTiIsImhhc0Nvb3JkaW5hdGVzIiwiaGFzQXR0cmlidXRlIiwiTUFSR0lOIiwiZ3JpZCIsIl9vcHRpb25zIiwiX2luaXRpYWxpemVkIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNtYWxsZXJTdG9uZXMiLCJmbGF0U3RvbmVzIiwiaGFzQ2xhc3MiLCJob3NoaVBvc2l0aW9uc0ZvciIsImJvYXJkU2l6ZSIsImhvc2hpRWxlbWVudHMiLCJob3NoaSIsInRvcCIsImxlZnQiLCJob3NoaU9mZnNldCIsImhvc2hpWSIsImhvc2hpWCIsIl9ob3NoaSIsInByb3RvdHlwZSIsIl9zZXR1cCIsImJvYXJkU3RhdGUiLCJyZW5kZXJlciIsIkJPQVJEX0xFTkdUSCIsImlubmVyQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzIiwiYXBwZW5kRWxlbWVudCIsInpvb21Db250YWluZXIiLCJjYW5jZWxab29tRWxlbWVudCIsImNhbmNlbFpvb21CYWNrZHJvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwiem9vbU91dCIsInRocm90dGxlIiwidHlwZSIsIm5hbWUiLCJydW5uaW5nIiwiZnVuYyIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsInNwZWNpZmljUmVuZGVyZXJCb2FyZCIsImdlbmVyYXRlQm9hcmQiLCJzdHlsZSIsIndpbGxDaGFuZ2UiLCJjb21wdXRlU2l6aW5nIiwidG91Y2htb3ZlQ2hhbmdlZFRvdWNoIiwidG91Y2hzdGFydEV2ZW50SGFuZGxlciIsImhhbmRsZVRvdWNoU3RhcnQiLCJiaW5kIiwidG91Y2htb3ZlRXZlbnRIYW5kbGVyIiwiaGFuZGxlVG91Y2hNb3ZlIiwidG91Y2hlbmRFdmVudEhhbmRsZXIiLCJoYW5kbGVUb3VjaEVuZCIsImhlaWdodCIsIndpZHRoIiwidHJhbnNmb3JtIiwiX3RvdWNoRXZlbnRGaXJlZCIsInNjYWxlWCIsInBhcmVudE5vZGUiLCJjbGllbnRXaWR0aCIsInNjYWxlWSIsImNsaWVudEhlaWdodCIsInNjYWxlIiwiTWF0aCIsIm1pbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzIiwiZWxlbWVudCIsInkiLCJ4IiwiaG92ZXJlZFlQb3NpdGlvbiIsImhvdmVyZWRYUG9zaXRpb24iLCJob3ZlclZhbHVlIiwicmVzZXRUb3VjaGVkUG9pbnQiLCJwbGF5ZWRZUG9zaXRpb24iLCJwbGF5ZWRYUG9zaXRpb24iLCJkb2N1bWVudCIsImJvZHkiLCJpbm5lcldpZHRoIiwiZ2FtZUlzT3ZlciIsImhhbmRsZUNsaWNrIiwidG91Y2hlZFBvaW50Iiwic2hvd1Bvc3NpYmxlTW92ZUF0IiwidG91Y2hlcyIsInpvb21lZEluIiwieEN1cnNvciIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WCIsInlDdXJzb3IiLCJjbGllbnRZIiwiZHJhZ1N0YXJ0WCIsImRyYWdTdGFydFkiLCJ0cmFuc2l0aW9uIiwiYW5pbWF0aW9uRnJhbWVSZXF1ZXN0SUQiLCJwcm9jZXNzRHJhZ0RlbHRhIiwibW92ZUluUHJvZ3Jlc3MiLCJ0cmFuc2xhdGVZIiwibGFzdFRyYW5zbGF0ZVkiLCJ0cmFuc2xhdGVYIiwibGFzdFRyYW5zbGF0ZVgiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImRlbHRhWCIsImRlbHRhWSIsImludGVyc2VjdGlvbkVsZW1lbnQiLCJ6b29tQ29udGFpbmVySGVpZ2h0Iiwiem9vbUNvbnRhaW5lcldpZHRoIiwicmVuZGVyIiwiX3RoaXMiLCJfcmVmMiIsImFyZ3VtZW50cyIsInRlcnJpdG9yeSIsImRlYWRTdG9uZXMiLCJyZW5kZXJTdG9uZXNQbGF5ZWQiLCJpbnRlcnNlY3Rpb25zIiwicGxheWVkUG9pbnQiLCJoaWRlUGxheWVkUG9pbnQiLCJ1cGRhdGVNYXJrZXJQb2ludHMiLCJrb1BvaW50IiwibGFiZWxQb2ludCIsImxhYmVsVHlwZSIsInZlcnRpY2FsU2hpZnRDbGFzc2VzIiwiaG9yaXpvbnRhbFNoaWZ0Q2xhc3NlcyIsInNoaWZ0Q2xhc3NlcyIsImNvbmNhdCIsImFscmVhZHlTaGlmdGVkIiwic29tZSIsImMiLCJwb3NzaWJsZVNoaWZ0cyIsImNhcnRlc2lhblByb2R1Y3QiLCJfcG9zc2libGVTaGlmdHMkTWF0aCQiLCJmbG9vciIsInJhbmRvbSIsInBsYXllZFZlcnRpY2FsU2hpZnQiLCJwbGF5ZWRIb3Jpem9udGFsU2hpZnQiLCJmb3JFYWNoIiwiX3JlZjMiLCJfcmVmNCIsIm5laWdoYm9yaW5nRWxlbWVudCIsIl9yZWY1IiwiX3JlZjYiLCJyZXF1aXJlZFlPZmZzZXQiLCJyZXF1aXJlZFhPZmZzZXQiLCJyZXF1aXJlZE5laWdoYm9yU2hpZnQiLCJjb25mbGljdGluZ1BsYXllZFNoaWZ0IiwibmV3TmVpZ2hib3JTaGlmdCIsImJsYWNrIiwid2hpdGUiLCJyZW5kZXJUZXJyaXRvcnkiLCJfdGhpczIiLCJpbnRlcnNlY3Rpb24iLCJyZW5kZXJJbnRlcnNlY3Rpb24iLCJfcmVmNyIsImludGVyc2VjdGlvbkVsIiwiY2xhc3NlcyIsImhhc0xhYmVsIiwiZ2V0TGFiZWwiLCJpc0VtcHR5IiwiaXNCbGFjayIsInNoaWZ0Q2xhc3MiLCJzZXRJbnRlcnNlY3Rpb25DbGFzc2VzIiwiX3RoaXMzIiwiZmxhdHRlbiIsInBvaW50IiwidGVycml0b3J5UG9pbnQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsU0FBTztBQURvQyxDQUE3Qzs7QUFJQSxJQUFJQyxpQkFBaUIsWUFBWTtBQUFFLFdBQVNDLGFBQVQsQ0FBdUJDLEdBQXZCLEVBQTRCQyxDQUE1QixFQUErQjtBQUFFLFFBQUlDLE9BQU8sRUFBWCxDQUFlLElBQUlDLEtBQUssSUFBVCxDQUFlLElBQUlDLEtBQUssS0FBVCxDQUFnQixJQUFJQyxLQUFLQyxTQUFULENBQW9CLElBQUk7QUFBRSxXQUFLLElBQUlDLEtBQUtQLElBQUlRLE9BQU9DLFFBQVgsR0FBVCxFQUFpQ0MsRUFBdEMsRUFBMEMsRUFBRVAsS0FBSyxDQUFDTyxLQUFLSCxHQUFHSSxJQUFILEVBQU4sRUFBaUJDLElBQXhCLENBQTFDLEVBQXlFVCxLQUFLLElBQTlFLEVBQW9GO0FBQUVELGFBQUtXLElBQUwsQ0FBVUgsR0FBR2IsS0FBYixFQUFxQixJQUFJSSxLQUFLQyxLQUFLWSxNQUFMLEtBQWdCYixDQUF6QixFQUE0QjtBQUFRO0FBQUUsS0FBdkosQ0FBd0osT0FBT2MsR0FBUCxFQUFZO0FBQUVYLFdBQUssSUFBTCxDQUFXQyxLQUFLVSxHQUFMO0FBQVcsS0FBNUwsU0FBcU07QUFBRSxVQUFJO0FBQUUsWUFBSSxDQUFDWixFQUFELElBQU9JLEdBQUcsUUFBSCxDQUFYLEVBQXlCQSxHQUFHLFFBQUg7QUFBaUIsT0FBaEQsU0FBeUQ7QUFBRSxZQUFJSCxFQUFKLEVBQVEsTUFBTUMsRUFBTjtBQUFXO0FBQUUsS0FBQyxPQUFPSCxJQUFQO0FBQWMsR0FBQyxPQUFPLFVBQVVGLEdBQVYsRUFBZUMsQ0FBZixFQUFrQjtBQUFF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QUFHRDtBQXZma0IsQ0FBckI7O0FBMGZBakgsUUFBUTZCLE9BQVIsR0FBa0JDLFFBQWxCOztBQUVBIiwiZmlsZSI6InJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG52YXIgX3V0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFJlbmRlcmVyID0gZnVuY3Rpb24gUmVuZGVyZXIoYm9hcmRFbGVtZW50LCBfcmVmKSB7XG4gIHZhciBob29rcyA9IF9yZWYuaG9va3MsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuXG4gIHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFID0gMjg7XG4gIHRoaXMuR1VUVEVSX01BUkdJTiA9IHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFIC0gMztcbiAgdGhpcy5CQVNFX01BUkdJTiA9IHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFIC0gMTA7XG4gIHRoaXMuaGFzQ29vcmRpbmF0ZXMgPSBib2FyZEVsZW1lbnQuaGFzQXR0cmlidXRlKFwiZGF0YS1pbmNsdWRlLWNvb3JkaW5hdGVzXCIpO1xuICB0aGlzLk1BUkdJTiA9IHRoaXMuaGFzQ29vcmRpbmF0ZXMgPyB0aGlzLkJBU0VfTUFSR0lOICsgdGhpcy5HVVRURVJfTUFSR0lOIDogdGhpcy5CQVNFX01BUkdJTjtcbiAgdGhpcy5ib2FyZEVsZW1lbnQgPSBib2FyZEVsZW1lbnQ7XG4gIHRoaXMuZ3JpZCA9IFtdO1xuICB0aGlzLmhvb2tzID0gaG9va3MgfHwge307XG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIGlmICh0aGlzLl9vcHRpb25zW1wiZnV6enlTdG9uZVBsYWNlbWVudFwiXSkge1xuICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWZ1enp5LXBsYWNlbWVudFwiKTtcbiAgICBfdXRpbHMyLmRlZmF1bHQucmVtb3ZlQ2xhc3MoYm9hcmRFbGVtZW50LCBcInRlbnVraS1ib2FyZC1mbGF0XCIpO1xuICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWJvYXJkLW5vbmZsYXRcIik7XG4gICAgdGhpcy5zbWFsbGVyU3RvbmVzID0gdHJ1ZTtcbiAgfVxuXG4gIHRoaXMuZmxhdFN0b25lcyA9IF91dGlsczIuZGVmYXVsdC5oYXNDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWJvYXJkLWZsYXRcIik7XG5cbiAgaWYgKCF0aGlzLmZsYXRTdG9uZXMpIHtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3MoYm9hcmRFbGVtZW50LCBcInRlbnVraS1ib2FyZC1ub25mbGF0XCIpO1xuICB9XG59O1xuXG5SZW5kZXJlci5ob3NoaVBvc2l0aW9uc0ZvciA9IGZ1bmN0aW9uIChib2FyZFNpemUpIHtcbiAgdmFyIGhvc2hpRWxlbWVudHMgPSBbXTtcblxuICBpZiAoYm9hcmRTaXplIDwgNykge1xuICAgIGlmIChib2FyZFNpemUgPiAxICYmIGJvYXJkU2l6ZSAlIDIgPT09IDEpIHtcbiAgICAgIHZhciBob3NoaSA9IHt9O1xuICAgICAgaG9zaGkudG9wID0gKGJvYXJkU2l6ZSAtIDEpIC8gMjtcbiAgICAgIGhvc2hpLmxlZnQgPSBob3NoaS50b3A7XG5cbiAgICAgIGhvc2hpRWxlbWVudHMucHVzaChob3NoaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIGhvc2hpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBob3NoaU9mZnNldCA9IGJvYXJkU2l6ZSA+IDExID8gMyA6IDI7XG5cbiAgICBmb3IgKHZhciBob3NoaVkgPSAwOyBob3NoaVkgPCAzOyBob3NoaVkrKykge1xuICAgICAgZm9yICh2YXIgaG9zaGlYID0gMDsgaG9zaGlYIDwgMzsgaG9zaGlYKyspIHtcbiAgICAgICAgaWYgKChib2FyZFNpemUgPT09IDcgfHwgYm9hcmRTaXplICUgMiA9PT0gMCkgJiYgKGhvc2hpWSA9PT0gMSB8fCBob3NoaVggPT09IDEpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2hvc2hpID0ge307XG5cbiAgICAgICAgaWYgKGhvc2hpWSA9PT0gMCkge1xuICAgICAgICAgIF9ob3NoaS50b3AgPSBob3NoaU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3NoaVkgPT09IDEpIHtcbiAgICAgICAgICBfaG9zaGkudG9wID0gKGJvYXJkU2l6ZSArIDEpIC8gMiAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG9zaGlZID09PSAyKSB7XG4gICAgICAgICAgX2hvc2hpLnRvcCA9IGJvYXJkU2l6ZSAtIGhvc2hpT2Zmc2V0IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3NoaVggPT09IDApIHtcbiAgICAgICAgICBfaG9zaGkubGVmdCA9IGhvc2hpT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvc2hpWCA9PT0gMSkge1xuICAgICAgICAgIF9ob3NoaS5sZWZ0ID0gKGJvYXJkU2l6ZSArIDEpIC8gMiAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG9zaGlYID09PSAyKSB7XG4gICAgICAgICAgX2hvc2hpLmxlZnQgPSBib2FyZFNpemUgLSBob3NoaU9mZnNldCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBob3NoaUVsZW1lbnRzLnB1c2goX2hvc2hpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG9zaGlFbGVtZW50cztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZSA9IHtcbiAgX3NldHVwOiBmdW5jdGlvbiBfc2V0dXAoYm9hcmRTdGF0ZSkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG4gICAgdmFyIGJvYXJkRWxlbWVudCA9IHRoaXMuYm9hcmRFbGVtZW50O1xuXG4gICAgcmVuZGVyZXIuQk9BUkRfTEVOR1RIID0gMiAqIHRoaXMuTUFSR0lOICsgKGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMSkgKiAodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKTtcblxuICAgIHZhciBpbm5lckNvbnRhaW5lciA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwidGVudWtpLWlubmVyLWNvbnRhaW5lclwiIH0pO1xuICAgIHJlbmRlcmVyLmlubmVyQ29udGFpbmVyID0gaW5uZXJDb250YWluZXI7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoYm9hcmRFbGVtZW50LCBpbm5lckNvbnRhaW5lcik7XG5cbiAgICB2YXIgem9vbUNvbnRhaW5lciA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwidGVudWtpLXpvb20tY29udGFpbmVyXCIgfSk7XG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lciA9IHpvb21Db250YWluZXI7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW5uZXJDb250YWluZXIsIHpvb21Db250YWluZXIpO1xuXG4gICAgcmVuZGVyZXIuY2FuY2VsWm9vbUVsZW1lbnQgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImNhbmNlbC16b29tXCIgfSk7XG4gICAgdmFyIGNhbmNlbFpvb21CYWNrZHJvcCA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiY2FuY2VsLXpvb20tYmFja2Ryb3BcIiB9KTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkRXZlbnRMaXN0ZW5lcihyZW5kZXJlci5jYW5jZWxab29tRWxlbWVudCwgXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZW5kZXJlci56b29tT3V0KCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkRXZlbnRMaXN0ZW5lcihjYW5jZWxab29tQmFja2Ryb3AsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmVuZGVyZXIuem9vbU91dCgpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW5uZXJDb250YWluZXIsIHJlbmRlcmVyLmNhbmNlbFpvb21FbGVtZW50KTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChpbm5lckNvbnRhaW5lciwgY2FuY2VsWm9vbUJhY2tkcm9wKTtcblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cy9yZXNpemVcbiAgICB2YXIgdGhyb3R0bGUgPSBmdW5jdGlvbiB0aHJvdHRsZSh0eXBlLCBuYW1lKSB7XG4gICAgICB2YXIgcnVubmluZyA9IGZhbHNlO1xuICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiBmdW5jKCkge1xuICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChuYW1lKSk7XG4gICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jKTtcbiAgICB9O1xuXG4gICAgdGhyb3R0bGUoXCJyZXNpemVcIiwgXCJvcHRpbWl6ZWRSZXNpemVcIik7XG5cbiAgICB2YXIgc3BlY2lmaWNSZW5kZXJlckJvYXJkID0gdGhpcy5nZW5lcmF0ZUJvYXJkKGJvYXJkU3RhdGUsIHtcbiAgICAgIGhhc0Nvb3JkaW5hdGVzOiB0aGlzLmhhc0Nvb3JkaW5hdGVzLFxuICAgICAgc21hbGxlclN0b25lczogdGhpcy5zbWFsbGVyU3RvbmVzLFxuICAgICAgZmxhdFN0b25lczogdGhpcy5mbGF0U3RvbmVzXG4gICAgfSk7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoem9vbUNvbnRhaW5lciwgc3BlY2lmaWNSZW5kZXJlckJvYXJkKTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgLy8gd2UnbGwgcG90ZW50aWFsbHkgYmUgem9vbWluZyBvbiB0b3VjaCBkZXZpY2VzXG4gICAgICB6b29tQ29udGFpbmVyLnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuXG4gICAgICByZW5kZXJlci5jb21wdXRlU2l6aW5nKCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9wdGltaXplZFJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZW5kZXJlci5jb21wdXRlU2l6aW5nKCk7XG4gICAgfSk7XG5cbiAgICByZW5kZXJlci50b3VjaG1vdmVDaGFuZ2VkVG91Y2ggPSBudWxsO1xuICAgIHJlbmRlcmVyLnRvdWNoc3RhcnRFdmVudEhhbmRsZXIgPSByZW5kZXJlci5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQocmVuZGVyZXIpO1xuICAgIHJlbmRlcmVyLnRvdWNobW92ZUV2ZW50SGFuZGxlciA9IHJlbmRlcmVyLmhhbmRsZVRvdWNoTW92ZS5iaW5kKHJlbmRlcmVyKTtcbiAgICByZW5kZXJlci50b3VjaGVuZEV2ZW50SGFuZGxlciA9IHJlbmRlcmVyLmhhbmRsZVRvdWNoRW5kLmJpbmQocmVuZGVyZXIpO1xuXG4gICAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIocmVuZGVyZXIuaW5uZXJDb250YWluZXIsIFwidG91Y2hzdGFydFwiLCByZW5kZXJlci50b3VjaHN0YXJ0RXZlbnRIYW5kbGVyKTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkRXZlbnRMaXN0ZW5lcihyZW5kZXJlci5pbm5lckNvbnRhaW5lciwgXCJ0b3VjaGVuZFwiLCByZW5kZXJlci50b3VjaGVuZEV2ZW50SGFuZGxlcik7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIocmVuZGVyZXIuaW5uZXJDb250YWluZXIsIFwidG91Y2htb3ZlXCIsIHJlbmRlcmVyLnRvdWNobW92ZUV2ZW50SGFuZGxlcik7XG4gIH0sXG5cbiAgY29tcHV0ZVNpemluZzogZnVuY3Rpb24gY29tcHV0ZVNpemluZygpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzO1xuICAgIHZhciBpbm5lckNvbnRhaW5lciA9IHRoaXMuaW5uZXJDb250YWluZXI7XG4gICAgdmFyIHpvb21Db250YWluZXIgPSB0aGlzLnpvb21Db250YWluZXI7XG4gICAgdmFyIGJvYXJkRWxlbWVudCA9IHRoaXMuYm9hcmRFbGVtZW50O1xuXG4gICAgLy8gcmVzZXQgZXZlcnl0aGluZyBzbyB3ZSBjYW4gY2FsY3VsYXRlIGFnYWluc3QgbmV3IHZhbHVlc1xuICAgIGlubmVyQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiXCI7XG4gICAgaW5uZXJDb250YWluZXIuc3R5bGUud2lkdGggPSBcIlwiO1xuICAgIHpvb21Db250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcbiAgICB6b29tQ29udGFpbmVyLnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICBpbm5lckNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgIC8vIHpvb21Db250YWluZXIuc3R5bGUud2lsbENoYW5nZSA9IFwiXCI7XG4gICAgYm9hcmRFbGVtZW50LnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICBib2FyZEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcblxuICAgIC8vIGRldi1mcmllbmRseSByZXNldCBvZiB3aGV0aGVyIHRoaXMgaXMgYSB0b3VjaCBkZXZpY2VcbiAgICByZW5kZXJlci5fdG91Y2hFdmVudEZpcmVkID0gbnVsbDtcblxuICAgIGlubmVyQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcmVuZGVyZXIuQk9BUkRfTEVOR1RIICsgXCJweFwiO1xuICAgIGlubmVyQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHJlbmRlcmVyLkJPQVJEX0xFTkdUSCArIFwicHhcIjtcblxuICAgIHpvb21Db250YWluZXIuc3R5bGUud2lkdGggPSByZW5kZXJlci5CT0FSRF9MRU5HVEggKyBcInB4XCI7XG4gICAgem9vbUNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSByZW5kZXJlci5CT0FSRF9MRU5HVEggKyBcInB4XCI7XG5cbiAgICB2YXIgc2NhbGVYID0gaW5uZXJDb250YWluZXIucGFyZW50Tm9kZS5jbGllbnRXaWR0aCAvIGlubmVyQ29udGFpbmVyLmNsaWVudFdpZHRoO1xuICAgIHZhciBzY2FsZVkgPSBpbm5lckNvbnRhaW5lci5wYXJlbnROb2RlLmNsaWVudEhlaWdodCAvIGlubmVyQ29udGFpbmVyLmNsaWVudEhlaWdodDtcbiAgICB2YXIgc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSk7XG5cbiAgICBpZiAoc2NhbGUgPiAwKSB7XG4gICAgICBpZiAoc2NhbGUgPCAxKSB7XG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLXNjYWxlZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5yZW1vdmVDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLXNjYWxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjYWxlIDwgMSB8fCBzY2FsZSA+IDEpIHtcbiAgICAgICAgaW5uZXJDb250YWluZXIuc3R5bGVbXCJ0cmFuc2Zvcm0tb3JpZ2luXCJdID0gXCJ0b3AgbGVmdFwiO1xuICAgICAgICBpbm5lckNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlM2QoXCIgKyBzY2FsZSArIFwiLCBcIiArIHNjYWxlICsgXCIsIDEpXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVzZXQgdGhlIG91dGVyIGVsZW1lbnQncyBoZWlnaHQgdG8gbWF0Y2gsIGVuc3VyaW5nIHRoYXQgd2UgZnJlZSB1cCBhbnkgbGluZ2VyaW5nIHdoaXRlc3BhY2VcbiAgICBib2FyZEVsZW1lbnQuc3R5bGUud2lkdGggPSBpbm5lckNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCArIFwicHhcIjtcbiAgICBib2FyZEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaW5uZXJDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0ICsgXCJweFwiO1xuXG4gICAgLy8gV29yayBhcm91bmQgbGFjayBvZiByZS1yYXN0ZXIgaW4gQ2hyb21lLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3czYy9jc3N3Zy1kcmFmdHMvaXNzdWVzLzIzNlxuICAgIC8vIGFuZCBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MDA0ODIgZm9yIG1vcmVcbiAgICAvLyBpbmZvcm1hdGlvbi4gVGhpcyBpcyBwcmV2ZW50aW5nLCBlLmcuLCBob3Jpem9udGFsL3ZlcnRpY2FsIGxpbmUgd2lkdGhcbiAgICAvLyBtaXNtYXRjaGVzIGFmdGVyIHNjYWxpbmcuIEJ5IGFkZGluZyB0aGlzLCBsaW5lcyBhcmUgcmUtcmFzdGVyZWQgYW5kIGFyZVxuICAgIC8vIGFsbCB0aGUgc2FtZSB3aWR0aCwgYXMgaWYgdGhlIHVzZXIgaGFkIGhpdCByZWZyZXNoIGF0IHRoZSBuZXcgdmlld3BvcnRcbiAgICAvLyBzaXplLlxuICAgIHpvb21Db250YWluZXIuc3R5bGUud2lsbENoYW5nZSA9IFwiXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHpvb21Db250YWluZXIuc3R5bGUud2lsbENoYW5nZSA9IFwidHJhbnNmb3JtXCI7XG4gICAgfSk7XG4gIH0sXG5cbiAgYWRkSW50ZXJzZWN0aW9uRXZlbnRMaXN0ZW5lcnM6IGZ1bmN0aW9uIGFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzKGVsZW1lbnQsIHksIHgpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBob3ZlcmVkWVBvc2l0aW9uID0geTtcbiAgICAgIHZhciBob3ZlcmVkWFBvc2l0aW9uID0geDtcbiAgICAgIHZhciBob3ZlclZhbHVlID0gcmVuZGVyZXIuaG9va3MuaG92ZXJWYWx1ZShob3ZlcmVkWVBvc2l0aW9uLCBob3ZlcmVkWFBvc2l0aW9uKTtcblxuICAgICAgaWYgKGhvdmVyVmFsdWUpIHtcbiAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKGVsZW1lbnQsIFwiaG92ZXJlZFwiKTtcbiAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKGVsZW1lbnQsIGhvdmVyVmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChfdXRpbHMyLmRlZmF1bHQuaGFzQ2xhc3ModGhpcywgXCJob3ZlcmVkXCIpKSB7XG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5yZW1vdmVDbGFzcyhlbGVtZW50LCBcImhvdmVyZWRcIik7XG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5yZW1vdmVDbGFzcyhlbGVtZW50LCBcImJsYWNrXCIpO1xuICAgICAgICBfdXRpbHMyLmRlZmF1bHQucmVtb3ZlQ2xhc3MoZWxlbWVudCwgXCJ3aGl0ZVwiKTtcbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIucmVzZXRUb3VjaGVkUG9pbnQoKTtcbiAgICB9KTtcblxuICAgIF91dGlsczIuZGVmYXVsdC5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHBsYXllZFlQb3NpdGlvbiA9IHk7XG4gICAgICB2YXIgcGxheWVkWFBvc2l0aW9uID0geDtcblxuICAgICAgLy8gaWYgdGhpcyBpc24ndCBwYXJ0IG9mIGEgdG91Y2gsXG4gICAgICAvLyBvciBpdCBpcyBhbmQgdGhlIHVzZXIgaXMgem9vbWVkIGluLFxuICAgICAgLy8gb3IgaXQncyBnYW1lIG92ZXIgYW5kIHdlJ3JlIG1hcmtpbmcgc3RvbmVzIGRlYWQsXG4gICAgICAvLyB0aGVuIGRvbid0IHVzZSB0aGUgem9vbS9kb3VibGUtc2VsZWN0IHN5c3RlbS5cbiAgICAgIGlmICghcmVuZGVyZXIuX3RvdWNoRXZlbnRGaXJlZCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC8gd2luZG93LmlubmVyV2lkdGggPiAxIHx8IHJlbmRlcmVyLmhvb2tzLmdhbWVJc092ZXIoKSkge1xuICAgICAgICByZW5kZXJlci5ob29rcy5oYW5kbGVDbGljayhwbGF5ZWRZUG9zaXRpb24sIHBsYXllZFhQb3NpdGlvbik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlbmRlcmVyLnRvdWNoZWRQb2ludCkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gcmVuZGVyZXIudG91Y2hlZFBvaW50KSB7XG4gICAgICAgICAgcmVuZGVyZXIuaG9va3MuaGFuZGxlQ2xpY2socGxheWVkWVBvc2l0aW9uLCBwbGF5ZWRYUG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbmRlcmVyLnNob3dQb3NzaWJsZU1vdmVBdChlbGVtZW50LCBwbGF5ZWRZUG9zaXRpb24sIHBsYXllZFhQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbmRlcmVyLnNob3dQb3NzaWJsZU1vdmVBdChlbGVtZW50LCBwbGF5ZWRZUG9zaXRpb24sIHBsYXllZFhQb3NpdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgaGFuZGxlVG91Y2hTdGFydDogZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydChldmVudCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG4gICAgcmVuZGVyZXIuX3RvdWNoRXZlbnRGaXJlZCA9IHRydWU7XG5cbiAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAocmVuZGVyZXIuem9vbWVkSW4pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXJlbmRlcmVyLnpvb21lZEluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHhDdXJzb3IgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICAgIHZhciB5Q3Vyc29yID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcblxuICAgIHJlbmRlcmVyLmRyYWdTdGFydFggPSB4Q3Vyc29yO1xuICAgIHJlbmRlcmVyLmRyYWdTdGFydFkgPSB5Q3Vyc29yO1xuICAgIHJlbmRlcmVyLnpvb21Db250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiO1xuICAgIHJlbmRlcmVyLmFuaW1hdGlvbkZyYW1lUmVxdWVzdElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJlci5wcm9jZXNzRHJhZ0RlbHRhLmJpbmQocmVuZGVyZXIpKTtcbiAgfSxcblxuICBoYW5kbGVUb3VjaE1vdmU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZShldmVudCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG5cbiAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFyZW5kZXJlci56b29tZWRJbikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gcHJldmVudCBwdWxsLXRvLXJlZnJlc2hcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgcmVuZGVyZXIudG91Y2htb3ZlQ2hhbmdlZFRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICByZW5kZXJlci5tb3ZlSW5Qcm9ncmVzcyA9IHRydWU7XG4gIH0sXG5cbiAgaGFuZGxlVG91Y2hFbmQ6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGV2ZW50KSB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcztcblxuICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXJlbmRlcmVyLnpvb21lZEluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcblxuICAgIGlmICghcmVuZGVyZXIubW92ZUluUHJvZ3Jlc3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVuZGVyZXIudHJhbnNsYXRlWSA9IHJlbmRlcmVyLmxhc3RUcmFuc2xhdGVZO1xuICAgIHJlbmRlcmVyLnRyYW5zbGF0ZVggPSByZW5kZXJlci5sYXN0VHJhbnNsYXRlWDtcbiAgICByZW5kZXJlci5tb3ZlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIHJlbmRlcmVyLnRvdWNobW92ZUNoYW5nZWRUb3VjaCA9IG51bGw7XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlbmRlcmVyLmFuaW1hdGlvbkZyYW1lUmVxdWVzdElEKTtcbiAgfSxcblxuICBwcm9jZXNzRHJhZ0RlbHRhOiBmdW5jdGlvbiBwcm9jZXNzRHJhZ0RlbHRhKCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG5cbiAgICBpZiAoIXJlbmRlcmVyLnRvdWNobW92ZUNoYW5nZWRUb3VjaCkge1xuICAgICAgcmVuZGVyZXIuYW5pbWF0aW9uRnJhbWVSZXF1ZXN0SUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcmVyLnByb2Nlc3NEcmFnRGVsdGEuYmluZChyZW5kZXJlcikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBpbm5lckNvbnRhaW5lciA9IHJlbmRlcmVyLmlubmVyQ29udGFpbmVyO1xuXG4gICAgdmFyIHhDdXJzb3IgPSByZW5kZXJlci50b3VjaG1vdmVDaGFuZ2VkVG91Y2guY2xpZW50WDtcbiAgICB2YXIgeUN1cnNvciA9IHJlbmRlcmVyLnRvdWNobW92ZUNoYW5nZWRUb3VjaC5jbGllbnRZO1xuXG4gICAgdmFyIGRlbHRhWCA9IHhDdXJzb3IgLSByZW5kZXJlci5kcmFnU3RhcnRYO1xuICAgIHZhciBkZWx0YVkgPSB5Q3Vyc29yIC0gcmVuZGVyZXIuZHJhZ1N0YXJ0WTtcblxuICAgIHZhciB0cmFuc2xhdGVZID0gcmVuZGVyZXIudHJhbnNsYXRlWSArIGRlbHRhWSAvIDIuNTtcbiAgICB2YXIgdHJhbnNsYXRlWCA9IHJlbmRlcmVyLnRyYW5zbGF0ZVggKyBkZWx0YVggLyAyLjU7XG5cbiAgICBpZiAodHJhbnNsYXRlWSA+IDAuNSAqIGlubmVyQ29udGFpbmVyLmNsaWVudEhlaWdodCAtIHJlbmRlcmVyLk1BUkdJTikge1xuICAgICAgdHJhbnNsYXRlWSA9IDAuNSAqIGlubmVyQ29udGFpbmVyLmNsaWVudEhlaWdodCAtIHJlbmRlcmVyLk1BUkdJTjtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNsYXRlWCA+IDAuNSAqIGlubmVyQ29udGFpbmVyLmNsaWVudFdpZHRoIC0gcmVuZGVyZXIuTUFSR0lOKSB7XG4gICAgICB0cmFuc2xhdGVYID0gMC41ICogaW5uZXJDb250YWluZXIuY2xpZW50V2lkdGggLSByZW5kZXJlci5NQVJHSU47XG4gICAgfVxuXG4gICAgaWYgKHRyYW5zbGF0ZVkgPCAtMC41ICogaW5uZXJDb250YWluZXIuY2xpZW50SGVpZ2h0ICsgcmVuZGVyZXIuTUFSR0lOKSB7XG4gICAgICB0cmFuc2xhdGVZID0gLTAuNSAqIGlubmVyQ29udGFpbmVyLmNsaWVudEhlaWdodCArIHJlbmRlcmVyLk1BUkdJTjtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNsYXRlWCA8IC0wLjUgKiBpbm5lckNvbnRhaW5lci5jbGllbnRXaWR0aCArIHJlbmRlcmVyLk1BUkdJTikge1xuICAgICAgdHJhbnNsYXRlWCA9IC0wLjUgKiBpbm5lckNvbnRhaW5lci5jbGllbnRXaWR0aCArIHJlbmRlcmVyLk1BUkdJTjtcbiAgICB9XG5cbiAgICByZW5kZXJlci56b29tQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoXCIgKyAyLjUgKiB0cmFuc2xhdGVYICsgXCJweCwgXCIgKyAyLjUgKiB0cmFuc2xhdGVZICsgXCJweCwgMCkgc2NhbGUzZCgyLjUsIDIuNSwgMSlcIjtcblxuICAgIHJlbmRlcmVyLmxhc3RUcmFuc2xhdGVYID0gdHJhbnNsYXRlWDtcbiAgICByZW5kZXJlci5sYXN0VHJhbnNsYXRlWSA9IHRyYW5zbGF0ZVk7XG5cbiAgICByZW5kZXJlci5hbmltYXRpb25GcmFtZVJlcXVlc3RJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyZXIucHJvY2Vzc0RyYWdEZWx0YS5iaW5kKHJlbmRlcmVyKSk7XG4gIH0sXG5cbiAgc2hvd1Bvc3NpYmxlTW92ZUF0OiBmdW5jdGlvbiBzaG93UG9zc2libGVNb3ZlQXQoaW50ZXJzZWN0aW9uRWxlbWVudCwgeSwgeCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG4gICAgdmFyIGJvYXJkRWxlbWVudCA9IHRoaXMuYm9hcmRFbGVtZW50O1xuICAgIHZhciB6b29tQ29udGFpbmVyID0gdGhpcy56b29tQ29udGFpbmVyO1xuXG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lckhlaWdodCA9IHJlbmRlcmVyLnpvb21Db250YWluZXJIZWlnaHQgfHwgem9vbUNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lcldpZHRoID0gcmVuZGVyZXIuem9vbUNvbnRhaW5lcldpZHRoIHx8IHpvb21Db250YWluZXIuY2xpZW50V2lkdGg7XG5cbiAgICByZW5kZXJlci50b3VjaGVkUG9pbnQgPSBpbnRlcnNlY3Rpb25FbGVtZW50O1xuXG4gICAgaWYgKF91dGlsczIuZGVmYXVsdC5oYXNDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLXNjYWxlZFwiKSkge1xuICAgICAgdmFyIHRvcCA9IHkgKiAodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKTtcbiAgICAgIHZhciBsZWZ0ID0geCAqICh0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpO1xuXG4gICAgICB2YXIgdHJhbnNsYXRlWSA9IDAuNSAqIHJlbmRlcmVyLnpvb21Db250YWluZXJIZWlnaHQgLSB0b3AgLSByZW5kZXJlci5NQVJHSU47XG4gICAgICB2YXIgdHJhbnNsYXRlWCA9IDAuNSAqIHJlbmRlcmVyLnpvb21Db250YWluZXJXaWR0aCAtIGxlZnQgLSByZW5kZXJlci5NQVJHSU47XG5cbiAgICAgIHpvb21Db250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUzZChcIiArIDIuNSAqIHRyYW5zbGF0ZVggKyBcInB4LCBcIiArIDIuNSAqIHRyYW5zbGF0ZVkgKyBcInB4LCAwKSBzY2FsZTNkKDIuNSwgMi41LCAxKVwiO1xuICAgICAgcmVuZGVyZXIudHJhbnNsYXRlWSA9IHRyYW5zbGF0ZVk7XG4gICAgICByZW5kZXJlci50cmFuc2xhdGVYID0gdHJhbnNsYXRlWDtcblxuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKHJlbmRlcmVyLmNhbmNlbFpvb21FbGVtZW50LCBcInZpc2libGVcIik7XG4gICAgICByZW5kZXJlci56b29tZWRJbiA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIHJlc2V0VG91Y2hlZFBvaW50OiBmdW5jdGlvbiByZXNldFRvdWNoZWRQb2ludCgpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgcmVuZGVyZXIudG91Y2hlZFBvaW50ID0gbnVsbDtcbiAgfSxcblxuICB6b29tT3V0OiBmdW5jdGlvbiB6b29tT3V0KCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG5cbiAgICB0aGlzLnJlc2V0VG91Y2hlZFBvaW50KCk7XG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgIHJlbmRlcmVyLnpvb21Db250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgcmVuZGVyZXIuZHJhZ1N0YXJ0WCA9IG51bGw7XG4gICAgcmVuZGVyZXIuZHJhZ1N0YXJ0WSA9IG51bGw7XG4gICAgcmVuZGVyZXIudHJhbnNsYXRlWSA9IG51bGw7XG4gICAgcmVuZGVyZXIudHJhbnNsYXRlWCA9IG51bGw7XG4gICAgcmVuZGVyZXIubGFzdFRyYW5zbGF0ZVggPSBudWxsO1xuICAgIHJlbmRlcmVyLmxhc3RUcmFuc2xhdGVZID0gbnVsbDtcblxuICAgIF91dGlsczIuZGVmYXVsdC5yZW1vdmVDbGFzcyhyZW5kZXJlci5jYW5jZWxab29tRWxlbWVudCwgXCJ2aXNpYmxlXCIpO1xuICAgIHJlbmRlcmVyLnpvb21lZEluID0gZmFsc2U7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoYm9hcmRTdGF0ZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgICB0ZXJyaXRvcnkgPSBfcmVmMi50ZXJyaXRvcnksXG4gICAgICAgIGRlYWRTdG9uZXMgPSBfcmVmMi5kZWFkU3RvbmVzO1xuXG4gICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fc2V0dXAoYm9hcmRTdGF0ZSk7XG4gICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldFRvdWNoZWRQb2ludCgpO1xuXG4gICAgdGhpcy5yZW5kZXJTdG9uZXNQbGF5ZWQoYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25zKTtcblxuICAgIHZhciBwbGF5ZWRQb2ludCA9IGJvYXJkU3RhdGUuaGlkZVBsYXllZFBvaW50ID8gbnVsbCA6IGJvYXJkU3RhdGUucGxheWVkUG9pbnQ7XG5cbiAgICB0aGlzLnVwZGF0ZU1hcmtlclBvaW50cyh7IHBsYXllZFBvaW50OiBwbGF5ZWRQb2ludCwga29Qb2ludDogYm9hcmRTdGF0ZS5rb1BvaW50LCBsYWJlbFBvaW50OiBib2FyZFN0YXRlLmxhYmVsUG9pbnQsIGxhYmVsVHlwZTogYm9hcmRTdGF0ZS5sYWJlbFR5cGUgfSk7XG5cbiAgICBpZiAodGhpcy5fb3B0aW9uc1tcImZ1enp5U3RvbmVQbGFjZW1lbnRcIl0gJiYgcGxheWVkUG9pbnQpIHtcbiAgICAgIHZhciB2ZXJ0aWNhbFNoaWZ0Q2xhc3NlcyA9IFtcInYtc2hpZnQtdXBcIiwgXCJ2LXNoaWZ0LXVwdXBcIiwgXCJ2LXNoaWZ0LWRvd25cIiwgXCJ2LXNoaWZ0LWRvd25kb3duXCIsIFwidi1zaGlmdC1ub25lXCJdO1xuXG4gICAgICB2YXIgaG9yaXpvbnRhbFNoaWZ0Q2xhc3NlcyA9IFtcImgtc2hpZnQtbGVmdFwiLCBcImgtc2hpZnQtbGVmdGxlZnRcIiwgXCJoLXNoaWZ0LXJpZ2h0XCIsIFwiaC1zaGlmdC1yaWdodHJpZ2h0XCIsIFwiaC1zaGlmdC1ub25lXCJdO1xuXG4gICAgICB2YXIgc2hpZnRDbGFzc2VzID0gdmVydGljYWxTaGlmdENsYXNzZXMuY29uY2F0KGhvcml6b250YWxTaGlmdENsYXNzZXMpO1xuXG4gICAgICB2YXIgYWxyZWFkeVNoaWZ0ZWQgPSBzaGlmdENsYXNzZXMuc29tZShmdW5jdGlvbiAoYykge1xuICAgICAgICByZXR1cm4gX3V0aWxzMi5kZWZhdWx0Lmhhc0NsYXNzKF90aGlzLmdyaWRbcGxheWVkUG9pbnQueV1bcGxheWVkUG9pbnQueF0sIGMpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghYWxyZWFkeVNoaWZ0ZWQpIHtcbiAgICAgICAgdmFyIHBvc3NpYmxlU2hpZnRzID0gX3V0aWxzMi5kZWZhdWx0LmNhcnRlc2lhblByb2R1Y3QodmVydGljYWxTaGlmdENsYXNzZXMsIGhvcml6b250YWxTaGlmdENsYXNzZXMpO1xuXG4gICAgICAgIHZhciBfcG9zc2libGVTaGlmdHMkTWF0aCQgPSBfc2xpY2VkVG9BcnJheShwb3NzaWJsZVNoaWZ0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZVNoaWZ0cy5sZW5ndGgpXSwgMiksXG4gICAgICAgICAgICBwbGF5ZWRWZXJ0aWNhbFNoaWZ0ID0gX3Bvc3NpYmxlU2hpZnRzJE1hdGgkWzBdLFxuICAgICAgICAgICAgcGxheWVkSG9yaXpvbnRhbFNoaWZ0ID0gX3Bvc3NpYmxlU2hpZnRzJE1hdGgkWzFdO1xuXG4gICAgICAgIFtbLTEsIDBdLCBbMCwgLTFdLCBbMCwgMV0sIFsxLCAwXV0uZm9yRWFjaChmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgICAgICB2YXIgX3JlZjQgPSBfc2xpY2VkVG9BcnJheShfcmVmMywgMiksXG4gICAgICAgICAgICAgIHkgPSBfcmVmNFswXSxcbiAgICAgICAgICAgICAgeCA9IF9yZWY0WzFdO1xuXG4gICAgICAgICAgaWYgKF90aGlzLmdyaWRbcGxheWVkUG9pbnQueSArIHldICYmIF90aGlzLmdyaWRbcGxheWVkUG9pbnQueSArIHldW3BsYXllZFBvaW50LnggKyB4XSkge1xuICAgICAgICAgICAgdmFyIG5laWdoYm9yaW5nRWxlbWVudCA9IF90aGlzLmdyaWRbcGxheWVkUG9pbnQueSArIHldW3BsYXllZFBvaW50LnggKyB4XTtcblxuICAgICAgICAgICAgaWYgKCFfdXRpbHMyLmRlZmF1bHQuaGFzQ2xhc3MobmVpZ2hib3JpbmdFbGVtZW50LCBcImVtcHR5XCIpKSB7XG4gICAgICAgICAgICAgIFtbLTEsIDAsIFwidi1zaGlmdC1kb3duZG93blwiLCBcInYtc2hpZnQtdXBcIiwgXCJ2LXNoaWZ0LWRvd25cIl0sIFstMSwgMCwgXCJ2LXNoaWZ0LWRvd25kb3duXCIsIFwidi1zaGlmdC11cHVwXCIsIFwidi1zaGlmdC1ub25lXCJdLCBbLTEsIDAsIFwidi1zaGlmdC1kb3duXCIsIFwidi1zaGlmdC11cHVwXCIsIFwidi1zaGlmdC1ub25lXCJdLCBbMSwgMCwgXCJ2LXNoaWZ0LXVwdXBcIiwgXCJ2LXNoaWZ0LWRvd25cIiwgXCJ2LXNoaWZ0LXVwXCJdLCBbMSwgMCwgXCJ2LXNoaWZ0LXVwdXBcIiwgXCJ2LXNoaWZ0LWRvd25kb3duXCIsIFwidi1zaGlmdC1ub25lXCJdLCBbMSwgMCwgXCJ2LXNoaWZ0LXVwXCIsIFwidi1zaGlmdC1kb3duZG93blwiLCBcInYtc2hpZnQtbm9uZVwiXSwgWzAsIC0xLCBcImgtc2hpZnQtcmlnaHRyaWdodFwiLCBcImgtc2hpZnQtbGVmdFwiLCBcImgtc2hpZnQtcmlnaHRcIl0sIFswLCAtMSwgXCJoLXNoaWZ0LXJpZ2h0cmlnaHRcIiwgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsIFwiaC1zaGlmdC1ub25lXCJdLCBbMCwgLTEsIFwiaC1zaGlmdC1yaWdodFwiLCBcImgtc2hpZnQtbGVmdGxlZnRcIiwgXCJoLXNoaWZ0LW5vbmVcIl0sIFswLCAxLCBcImgtc2hpZnQtbGVmdGxlZnRcIiwgXCJoLXNoaWZ0LXJpZ2h0XCIsIFwiaC1zaGlmdC1sZWZ0XCJdLCBbMCwgMSwgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsIFwiaC1zaGlmdC1yaWdodHJpZ2h0XCIsIFwiaC1zaGlmdC1ub25lXCJdLCBbMCwgMSwgXCJoLXNoaWZ0LWxlZnRcIiwgXCJoLXNoaWZ0LXJpZ2h0cmlnaHRcIiwgXCJoLXNoaWZ0LW5vbmVcIl1dLmZvckVhY2goZnVuY3Rpb24gKF9yZWY1KSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWY2ID0gX3NsaWNlZFRvQXJyYXkoX3JlZjUsIDUpLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFlPZmZzZXQgPSBfcmVmNlswXSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRYT2Zmc2V0ID0gX3JlZjZbMV0sXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkTmVpZ2hib3JTaGlmdCA9IF9yZWY2WzJdLFxuICAgICAgICAgICAgICAgICAgICBjb25mbGljdGluZ1BsYXllZFNoaWZ0ID0gX3JlZjZbM10sXG4gICAgICAgICAgICAgICAgICAgIG5ld05laWdoYm9yU2hpZnQgPSBfcmVmNls0XTtcblxuICAgICAgICAgICAgICAgIGlmICh5ID09PSByZXF1aXJlZFlPZmZzZXQgJiYgeCA9PT0gcmVxdWlyZWRYT2Zmc2V0ICYmIF91dGlsczIuZGVmYXVsdC5oYXNDbGFzcyhuZWlnaGJvcmluZ0VsZW1lbnQsIHJlcXVpcmVkTmVpZ2hib3JTaGlmdCkgJiYgKHBsYXllZFZlcnRpY2FsU2hpZnQgPT09IGNvbmZsaWN0aW5nUGxheWVkU2hpZnQgfHwgcGxheWVkSG9yaXpvbnRhbFNoaWZ0ID09PSBjb25mbGljdGluZ1BsYXllZFNoaWZ0KSkge1xuICAgICAgICAgICAgICAgICAgX3V0aWxzMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5laWdoYm9yaW5nRWxlbWVudCwgcmVxdWlyZWROZWlnaGJvclNoaWZ0KTtcbiAgICAgICAgICAgICAgICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhuZWlnaGJvcmluZ0VsZW1lbnQsIG5ld05laWdoYm9yU2hpZnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3ModGhpcy5ncmlkW3BsYXllZFBvaW50LnldW3BsYXllZFBvaW50LnhdLCBwbGF5ZWRWZXJ0aWNhbFNoaWZ0KTtcbiAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKHRoaXMuZ3JpZFtwbGF5ZWRQb2ludC55XVtwbGF5ZWRQb2ludC54XSwgcGxheWVkSG9yaXpvbnRhbFNoaWZ0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVhZFN0b25lcy5sZW5ndGggPiAwIHx8IHRlcnJpdG9yeS5ibGFjay5sZW5ndGggPiAwIHx8IHRlcnJpdG9yeS53aGl0ZS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnJlbmRlclRlcnJpdG9yeSh0ZXJyaXRvcnksIGRlYWRTdG9uZXMpO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXJTdG9uZXNQbGF5ZWQ6IGZ1bmN0aW9uIHJlbmRlclN0b25lc1BsYXllZChpbnRlcnNlY3Rpb25zKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBpbnRlcnNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGludGVyc2VjdGlvbikge1xuICAgICAgX3RoaXMyLnJlbmRlckludGVyc2VjdGlvbihpbnRlcnNlY3Rpb24pO1xuICAgIH0pO1xuICB9LFxuXG4gIHVwZGF0ZU1hcmtlclBvaW50czogZnVuY3Rpb24gdXBkYXRlTWFya2VyUG9pbnRzKF9yZWY3KSB7XG4gICAgdmFyIHBsYXllZFBvaW50ID0gX3JlZjcucGxheWVkUG9pbnQsXG4gICAgICAgIGtvUG9pbnQgPSBfcmVmNy5rb1BvaW50LFxuICAgICAgICBsYWJlbFBvaW50ID0gX3JlZjcubGFiZWxQb2ludCxcbiAgICAgICAgbGFiZWxUeXBlID0gX3JlZjcubGFiZWxUeXBlO1xuXG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcztcblxuICAgIGlmIChrb1BvaW50KSB7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3MocmVuZGVyZXIuZ3JpZFtrb1BvaW50LnldW2tvUG9pbnQueF0sIFwia29cIik7XG4gICAgfVxuXG4gICAgaWYgKHBsYXllZFBvaW50KSB7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3MocmVuZGVyZXIuZ3JpZFtwbGF5ZWRQb2ludC55XVtwbGF5ZWRQb2ludC54XSwgXCJwbGF5ZWRcIik7XG4gICAgfVxuXG4gICAgaWYgKGxhYmVsUG9pbnQpIHtcbiAgICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhyZW5kZXJlci5ncmlkW2xhYmVsUG9pbnQueV1bbGFiZWxQb2ludC54XSwgbGFiZWxUeXBlKTtcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVySW50ZXJzZWN0aW9uOiBmdW5jdGlvbiByZW5kZXJJbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uKSB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcztcblxuICAgIHZhciBpbnRlcnNlY3Rpb25FbCA9IHJlbmRlcmVyLmdyaWRbaW50ZXJzZWN0aW9uLnldW2ludGVyc2VjdGlvbi54XTtcblxuICAgIHZhciBjbGFzc2VzID0gW1wiaW50ZXJzZWN0aW9uXCJdO1xuXG4gICAgaWYgKGludGVyc2VjdGlvbi5oYXNMYWJlbCgpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goaW50ZXJzZWN0aW9uLmdldExhYmVsKCkpO1xuICAgIH1cblxuICAgIGlmIChpbnRlcnNlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJlbXB0eVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwib2NjdXBpZWRcIik7XG5cbiAgICAgIGlmIChpbnRlcnNlY3Rpb24uaXNCbGFjaygpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChcImJsYWNrXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKFwid2hpdGVcIik7XG4gICAgICB9XG5cbiAgICAgIHZhciBzaGlmdENsYXNzZXMgPSBbXCJ2LXNoaWZ0LXVwXCIsIFwidi1zaGlmdC11cHVwXCIsIFwidi1zaGlmdC1kb3duXCIsIFwidi1zaGlmdC1kb3duZG93blwiLCBcInYtc2hpZnQtbm9uZVwiLCBcImgtc2hpZnQtbGVmdFwiLCBcImgtc2hpZnQtbGVmdGxlZnRcIiwgXCJoLXNoaWZ0LXJpZ2h0XCIsIFwiaC1zaGlmdC1yaWdodHJpZ2h0XCIsIFwiaC1zaGlmdC1ub25lXCJdO1xuXG4gICAgICBzaGlmdENsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoc2hpZnRDbGFzcykge1xuICAgICAgICBpZiAoX3V0aWxzMi5kZWZhdWx0Lmhhc0NsYXNzKGludGVyc2VjdGlvbkVsLCBzaGlmdENsYXNzKSkge1xuICAgICAgICAgIGNsYXNzZXMucHVzaChzaGlmdENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRJbnRlcnNlY3Rpb25DbGFzc2VzKGludGVyc2VjdGlvbkVsLCBpbnRlcnNlY3Rpb24sIGNsYXNzZXMpO1xuICB9LFxuXG4gIHJlbmRlclRlcnJpdG9yeTogZnVuY3Rpb24gcmVuZGVyVGVycml0b3J5KHRlcnJpdG9yeSwgZGVhZFN0b25lcykge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgX3V0aWxzMi5kZWZhdWx0LmZsYXR0ZW4odGhpcy5ncmlkKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQucmVtb3ZlQ2xhc3MoZWxlbWVudCwgXCJ0ZXJyaXRvcnktYmxhY2tcIik7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQucmVtb3ZlQ2xhc3MoZWxlbWVudCwgXCJ0ZXJyaXRvcnktd2hpdGVcIik7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQucmVtb3ZlQ2xhc3MoZWxlbWVudCwgXCJkZWFkXCIpO1xuICAgIH0pO1xuXG4gICAgZGVhZFN0b25lcy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKF90aGlzMy5ncmlkW3BvaW50LnldW3BvaW50LnhdLCBcImRlYWRcIik7XG4gICAgfSk7XG5cbiAgICB0ZXJyaXRvcnkuYmxhY2suZm9yRWFjaChmdW5jdGlvbiAodGVycml0b3J5UG9pbnQpIHtcbiAgICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhfdGhpczMuZ3JpZFt0ZXJyaXRvcnlQb2ludC55XVt0ZXJyaXRvcnlQb2ludC54XSwgXCJ0ZXJyaXRvcnktYmxhY2tcIik7XG4gICAgfSk7XG5cbiAgICB0ZXJyaXRvcnkud2hpdGUuZm9yRWFjaChmdW5jdGlvbiAodGVycml0b3J5UG9pbnQpIHtcbiAgICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhfdGhpczMuZ3JpZFt0ZXJyaXRvcnlQb2ludC55XVt0ZXJyaXRvcnlQb2ludC54XSwgXCJ0ZXJyaXRvcnktd2hpdGVcIik7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJlbmRlcmVyO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZW5kZXJlci5qcy5tYXAiXX0=
},{"./utils":14}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var VALID_KO_OPTIONS = ["simple", "positional-superko", "situational-superko", "natural-situational-superko"];

var Ruleset = function Ruleset(_ref) {
  var koRule = _ref.koRule;

  this.koRule = koRule;

  if (VALID_KO_OPTIONS.indexOf(this.koRule) < 0) {
    throw new Error("Unknown ko rule: " + koRule);
  }

  Object.freeze(this);
};

Ruleset.prototype = {
  isIllegal: function isIllegal(y, x, game) {
    var boardState = game.currentState();
    var intersection = boardState.intersectionAt(y, x);

    var result = !intersection.isEmpty() || this._wouldBeSuicide(y, x, boardState) || this._isKoViolation(y, x, boardState, game._moves);

    return result;
  },

  _isKoViolation: function _isKoViolation(y, x, boardState, existingStates) {
    var isKoViolation = false;

    if (this.koRule === "simple") {
      var simpleKoPoint = boardState._simpleKoPoint();
      isKoViolation = Boolean(simpleKoPoint) && y === simpleKoPoint.y && x === simpleKoPoint.x;
    } else {
      var newState = boardState.playAt(y, x, boardState.nextColor());

      var hasDuplicatePosition = function hasDuplicatePosition(condition) {
        return existingStates.length > 0 && existingStates.some(function (existingState) {
          return condition(existingState) && existingState.positionSameAs(newState);
        });
      };

      if (this.koRule === "positional-superko") {
        isKoViolation = hasDuplicatePosition(function () {
          return true;
        });
      } else if (this.koRule === "situational-superko") {
        isKoViolation = hasDuplicatePosition(function (state) {
          return state.color === newState.color;
        });
      } else if (this.koRule === "natural-situational-superko") {
        isKoViolation = hasDuplicatePosition(function (state) {
          return !state.pass && state.color === newState.color;
        });
      } else {
        throw new Error("Unimplemented ko rule " + this.koRule);
      }
    }

    return isKoViolation;
  },

  _wouldBeSuicide: function _wouldBeSuicide(y, x, boardState) {
    var color = boardState.nextColor();
    var intersection = boardState.intersectionAt(y, x);
    var surroundedEmptyPoint = intersection.isEmpty() && boardState.neighborsFor(intersection.y, intersection.x).filter(function (neighbor) {
      return neighbor.isEmpty();
    }).length === 0;

    if (!surroundedEmptyPoint) {
      return false;
    }

    var someFriendlyNotInAtari = boardState.neighborsFor(intersection.y, intersection.x).some(function (neighbor) {
      var inAtari = boardState.inAtari(neighbor.y, neighbor.x);
      var friendly = neighbor.isOccupiedWith(color);

      return friendly && !inAtari;
    });

    if (someFriendlyNotInAtari) {
      return false;
    }

    var someEnemyInAtari = boardState.neighborsFor(intersection.y, intersection.x).some(function (neighbor) {
      var inAtari = boardState.inAtari(neighbor.y, neighbor.x);
      var enemy = !neighbor.isOccupiedWith(color);

      return enemy && inAtari;
    });

    if (someEnemyInAtari) {
      return false;
    }

    return true;
  }
};

exports.default = Ruleset;

//# sourceMappingURL=ruleset.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzZXQuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJWQUxJRF9LT19PUFRJT05TIiwiUnVsZXNldCIsIl9yZWYiLCJrb1J1bGUiLCJpbmRleE9mIiwiRXJyb3IiLCJmcmVlemUiLCJwcm90b3R5cGUiLCJpc0lsbGVnYWwiLCJ5IiwieCIsImdhbWUiLCJib2FyZFN0YXRlIiwiY3VycmVudFN0YXRlIiwiaW50ZXJzZWN0aW9uIiwiaW50ZXJzZWN0aW9uQXQiLCJyZXN1bHQiLCJpc0VtcHR5IiwiX3dvdWxkQmVTdWljaWRlIiwiX2lzS29WaW9sYXRpb24iLCJfbW92ZXMiLCJleGlzdGluZ1N0YXRlcyIsImlzS29WaW9sYXRpb24iLCJzaW1wbGVLb1BvaW50IiwiX3NpbXBsZUtvUG9pbnQiLCJCb29sZWFuIiwibmV3U3RhdGUiLCJwbGF5QXQiLCJuZXh0Q29sb3IiLCJoYXNEdXBsaWNhdGVQb3NpdGlvbiIsImNvbmRpdGlvbiIsImxlbmd0aCIsInNvbWUiLCJleGlzdGluZ1N0YXRlIiwicG9zaXRpb25TYW1lQXMiLCJzdGF0ZSIsImNvbG9yIiwicGFzcyIsInN1cnJvdW5kZWRFbXB0eVBvaW50IiwibmVpZ2hib3JzRm9yIiwiZmlsdGVyIiwibmVpZ2hib3IiLCJzb21lRnJpZW5kbHlOb3RJbkF0YXJpIiwiaW5BdGFyaSIsImZyaWVuZGx5IiwiaXNPY2N1cGllZFdpdGgiLCJzb21lRW5lbXlJbkF0YXJpIiwiZW5lbXkiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJQyxtQkFBbUIsQ0FBQyxRQUFELEVBQVcsb0JBQVgsRUFBaUMscUJBQWpDLEVBQXdELDZCQUF4RCxDQUF2Qjs7QUFFQSxJQUFJQyxVQUFVLFNBQVNBLE9BQVQsQ0FBaUJDLElBQWpC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YUFBT1csU0FBU0osT0FBaEI7QUFDRCxLQUxzQixDQUF2Qjs7QUFPQSxRQUFJRyxnQkFBSixFQUFzQjtBQUNwQixhQUFPLEtBQVA7QUFDRDs7QUFFRCxXQUFPLElBQVA7QUFDRDtBQS9FaUIsQ0FBcEI7O0FBa0ZBaEQsUUFBUWtELE9BQVIsR0FBa0IvQyxPQUFsQjs7QUFFQSIsImZpbGUiOiJydWxlc2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgVkFMSURfS09fT1BUSU9OUyA9IFtcInNpbXBsZVwiLCBcInBvc2l0aW9uYWwtc3VwZXJrb1wiLCBcInNpdHVhdGlvbmFsLXN1cGVya29cIiwgXCJuYXR1cmFsLXNpdHVhdGlvbmFsLXN1cGVya29cIl07XG5cbnZhciBSdWxlc2V0ID0gZnVuY3Rpb24gUnVsZXNldChfcmVmKSB7XG4gIHZhciBrb1J1bGUgPSBfcmVmLmtvUnVsZTtcblxuICB0aGlzLmtvUnVsZSA9IGtvUnVsZTtcblxuICBpZiAoVkFMSURfS09fT1BUSU9OUy5pbmRleE9mKHRoaXMua29SdWxlKSA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGtvIHJ1bGU6IFwiICsga29SdWxlKTtcbiAgfVxuXG4gIE9iamVjdC5mcmVlemUodGhpcyk7XG59O1xuXG5SdWxlc2V0LnByb3RvdHlwZSA9IHtcbiAgaXNJbGxlZ2FsOiBmdW5jdGlvbiBpc0lsbGVnYWwoeSwgeCwgZ2FtZSkge1xuICAgIHZhciBib2FyZFN0YXRlID0gZ2FtZS5jdXJyZW50U3RhdGUoKTtcbiAgICB2YXIgaW50ZXJzZWN0aW9uID0gYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25BdCh5LCB4KTtcblxuICAgIHZhciByZXN1bHQgPSAhaW50ZXJzZWN0aW9uLmlzRW1wdHkoKSB8fCB0aGlzLl93b3VsZEJlU3VpY2lkZSh5LCB4LCBib2FyZFN0YXRlKSB8fCB0aGlzLl9pc0tvVmlvbGF0aW9uKHksIHgsIGJvYXJkU3RhdGUsIGdhbWUuX21vdmVzKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgX2lzS29WaW9sYXRpb246IGZ1bmN0aW9uIF9pc0tvVmlvbGF0aW9uKHksIHgsIGJvYXJkU3RhdGUsIGV4aXN0aW5nU3RhdGVzKSB7XG4gICAgdmFyIGlzS29WaW9sYXRpb24gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmtvUnVsZSA9PT0gXCJzaW1wbGVcIikge1xuICAgICAgdmFyIHNpbXBsZUtvUG9pbnQgPSBib2FyZFN0YXRlLl9zaW1wbGVLb1BvaW50KCk7XG4gICAgICBpc0tvVmlvbGF0aW9uID0gQm9vbGVhbihzaW1wbGVLb1BvaW50KSAmJiB5ID09PSBzaW1wbGVLb1BvaW50LnkgJiYgeCA9PT0gc2ltcGxlS29Qb2ludC54O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbmV3U3RhdGUgPSBib2FyZFN0YXRlLnBsYXlBdCh5LCB4LCBib2FyZFN0YXRlLm5leHRDb2xvcigpKTtcblxuICAgICAgdmFyIGhhc0R1cGxpY2F0ZVBvc2l0aW9uID0gZnVuY3Rpb24gaGFzRHVwbGljYXRlUG9zaXRpb24oY29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1N0YXRlcy5sZW5ndGggPiAwICYmIGV4aXN0aW5nU3RhdGVzLnNvbWUoZnVuY3Rpb24gKGV4aXN0aW5nU3RhdGUpIHtcbiAgICAgICAgICByZXR1cm4gY29uZGl0aW9uKGV4aXN0aW5nU3RhdGUpICYmIGV4aXN0aW5nU3RhdGUucG9zaXRpb25TYW1lQXMobmV3U3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLmtvUnVsZSA9PT0gXCJwb3NpdGlvbmFsLXN1cGVya29cIikge1xuICAgICAgICBpc0tvVmlvbGF0aW9uID0gaGFzRHVwbGljYXRlUG9zaXRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5rb1J1bGUgPT09IFwic2l0dWF0aW9uYWwtc3VwZXJrb1wiKSB7XG4gICAgICAgIGlzS29WaW9sYXRpb24gPSBoYXNEdXBsaWNhdGVQb3NpdGlvbihmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUuY29sb3IgPT09IG5ld1N0YXRlLmNvbG9yO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5rb1J1bGUgPT09IFwibmF0dXJhbC1zaXR1YXRpb25hbC1zdXBlcmtvXCIpIHtcbiAgICAgICAgaXNLb1Zpb2xhdGlvbiA9IGhhc0R1cGxpY2F0ZVBvc2l0aW9uKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgIHJldHVybiAhc3RhdGUucGFzcyAmJiBzdGF0ZS5jb2xvciA9PT0gbmV3U3RhdGUuY29sb3I7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5pbXBsZW1lbnRlZCBrbyBydWxlIFwiICsgdGhpcy5rb1J1bGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpc0tvVmlvbGF0aW9uO1xuICB9LFxuXG4gIF93b3VsZEJlU3VpY2lkZTogZnVuY3Rpb24gX3dvdWxkQmVTdWljaWRlKHksIHgsIGJvYXJkU3RhdGUpIHtcbiAgICB2YXIgY29sb3IgPSBib2FyZFN0YXRlLm5leHRDb2xvcigpO1xuICAgIHZhciBpbnRlcnNlY3Rpb24gPSBib2FyZFN0YXRlLmludGVyc2VjdGlvbkF0KHksIHgpO1xuICAgIHZhciBzdXJyb3VuZGVkRW1wdHlQb2ludCA9IGludGVyc2VjdGlvbi5pc0VtcHR5KCkgJiYgYm9hcmRTdGF0ZS5uZWlnaGJvcnNGb3IoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54KS5maWx0ZXIoZnVuY3Rpb24gKG5laWdoYm9yKSB7XG4gICAgICByZXR1cm4gbmVpZ2hib3IuaXNFbXB0eSgpO1xuICAgIH0pLmxlbmd0aCA9PT0gMDtcblxuICAgIGlmICghc3Vycm91bmRlZEVtcHR5UG9pbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgc29tZUZyaWVuZGx5Tm90SW5BdGFyaSA9IGJvYXJkU3RhdGUubmVpZ2hib3JzRm9yKGludGVyc2VjdGlvbi55LCBpbnRlcnNlY3Rpb24ueCkuc29tZShmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgIHZhciBpbkF0YXJpID0gYm9hcmRTdGF0ZS5pbkF0YXJpKG5laWdoYm9yLnksIG5laWdoYm9yLngpO1xuICAgICAgdmFyIGZyaWVuZGx5ID0gbmVpZ2hib3IuaXNPY2N1cGllZFdpdGgoY29sb3IpO1xuXG4gICAgICByZXR1cm4gZnJpZW5kbHkgJiYgIWluQXRhcmk7XG4gICAgfSk7XG5cbiAgICBpZiAoc29tZUZyaWVuZGx5Tm90SW5BdGFyaSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBzb21lRW5lbXlJbkF0YXJpID0gYm9hcmRTdGF0ZS5uZWlnaGJvcnNGb3IoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54KS5zb21lKGZ1bmN0aW9uIChuZWlnaGJvcikge1xuICAgICAgdmFyIGluQXRhcmkgPSBib2FyZFN0YXRlLmluQXRhcmkobmVpZ2hib3IueSwgbmVpZ2hib3IueCk7XG4gICAgICB2YXIgZW5lbXkgPSAhbmVpZ2hib3IuaXNPY2N1cGllZFdpdGgoY29sb3IpO1xuXG4gICAgICByZXR1cm4gZW5lbXkgJiYgaW5BdGFyaTtcbiAgICB9KTtcblxuICAgIGlmIChzb21lRW5lbXlJbkF0YXJpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJ1bGVzZXQ7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ1bGVzZXQuanMubWFwIl19
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _intersection = require("./intersection");

var _intersection2 = _interopRequireDefault(_intersection);

var _region = require("./region");

var _region2 = _interopRequireDefault(_region);

var _eyePoint = require("./eye-point");

var _eyePoint2 = _interopRequireDefault(_eyePoint);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var boardStateWithoutDeadPoints = function boardStateWithoutDeadPoints(game) {
  return game.currentState()._withoutIntersectionsMatching(function (i) {
    return game._isDeadAt(i.y, i.x);
  });
};

var boardStateWithoutNeutralPoints = function boardStateWithoutNeutralPoints(boardState) {
  var regions = _region2.default.allFor(boardState);
  var neutralRegions = regions.filter(function (r) {
    return r.isNeutral();
  });

  if (regions.length === 0 || neutralRegions.length === 0) {
    return boardState;
  }

  var replacements = {};

  neutralRegions.forEach(function (r) {
    var startingX = null;
    var startingY = null;

    r.intersections.forEach(function (intersection) {
      startingX = startingX || intersection.x;
      startingX = startingX || intersection.y;

      var manhattanDistance = Math.abs(intersection.y - startingY) + Math.abs(intersection.x - startingX);
      var replacementColor = ["black", "white"][manhattanDistance % 2];
      var replacement = new _intersection2.default(intersection.y, intersection.x, replacementColor);

      replacements[intersection.y] = replacements[intersection.y] || [];
      replacements[intersection.y][intersection.x] = replacement;
    });
  });

  var newPoints = boardState.intersections.map(function (i) {
    if (replacements[i.y] && replacements[i.y][i.x]) {
      return replacements[i.y][i.x];
    } else {
      return i;
    }
  });

  return boardState._withNewPoints(newPoints);
};

var boardStateWithClearFalseEyesFilled = function boardStateWithClearFalseEyesFilled(boardState) {
  var territoryRegions = _region2.default.allFor(boardState).filter(function (r) {
    return r.isTerritory();
  });
  var falseEyePoints = _utils2.default.flatMap(territoryRegions, function (r) {
    return r.intersections;
  }).filter(function (i) {
    return new _eyePoint2.default(boardState, i).isFalse();
  });

  var pointsNeighboringAtari = falseEyePoints.filter(function (i) {
    return boardState.neighborsFor(i.y, i.x).some(function (n) {
      return boardState.inAtari(n.y, n.x);
    });
  });
  var neutralAtariUpdatedState = boardState;

  var _loop = function _loop() {
    var newPoints = neutralAtariUpdatedState.intersections.map(function (i) {
      if (pointsNeighboringAtari.indexOf(i) > -1) {
        return new _intersection2.default(i.y, i.x, new _eyePoint2.default(neutralAtariUpdatedState, i).filledColor());
      } else {
        return i;
      }
    });
    neutralAtariUpdatedState = neutralAtariUpdatedState._withNewPoints(newPoints);

    var boardState = boardStateWithoutNeutralPoints(neutralAtariUpdatedState);
    var territoryRegions = _region2.default.allFor(boardState).filter(function (r) {
      return r.isTerritory();
    });
    var falseEyePoints = _utils2.default.flatMap(territoryRegions, function (r) {
      return r.intersections;
    }).filter(function (i) {
      return new _eyePoint2.default(boardState, i).isFalse();
    });

    pointsNeighboringAtari = falseEyePoints.filter(function (i) {
      return neutralAtariUpdatedState.neighborsFor(i.y, i.x).some(function (n) {
        return neutralAtariUpdatedState.inAtari(n.y, n.x);
      });
    });
  };

  while (pointsNeighboringAtari.length > 0) {
    _loop();
  }

  return neutralAtariUpdatedState;
};

var TerritoryScoring = Object.freeze({
  score: function score(game) {
    var blackDeadAsCaptures = game.deadStones().filter(function (deadPoint) {
      return game.intersectionAt(deadPoint.y, deadPoint.x).isBlack();
    });
    var whiteDeadAsCaptures = game.deadStones().filter(function (deadPoint) {
      return game.intersectionAt(deadPoint.y, deadPoint.x).isWhite();
    });

    var territory = game.territory();
    var boardState = game.currentState();

    return {
      black: territory.black.length + boardState.whiteStonesCaptured + whiteDeadAsCaptures.length,
      white: territory.white.length + boardState.blackStonesCaptured + blackDeadAsCaptures.length
    };
  },

  territory: function territory(game) {
    var stateWithoutDeadPoints = boardStateWithoutDeadPoints(game);
    var stateWithoutNeutrals = boardStateWithoutNeutralPoints(stateWithoutDeadPoints);
    var stateWithClearFalseEyesFilled = boardStateWithClearFalseEyesFilled(stateWithoutNeutrals);

    var territoryRegions = _region2.default.allFor(stateWithClearFalseEyesFilled).filter(function (r) {
      return r.isTerritory();
    });

    var territoryRegionsWithoutSeki = territoryRegions.filter(function (r) {
      var merged = _region2.default.merge(territoryRegions, r);
      var eyeCounts = merged.map(function (m) {
        return Math.ceil(m.numberOfEyes());
      });

      return eyeCounts.length > 0 && eyeCounts.reduce(function (a, b) {
        return a + b;
      }) >= 2;
    });

    var blackRegions = territoryRegionsWithoutSeki.filter(function (r) {
      return r.isBlack();
    });
    var whiteRegions = territoryRegionsWithoutSeki.filter(function (r) {
      return r.isWhite();
    });

    return {
      black: _utils2.default.flatMap(blackRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      }),
      white: _utils2.default.flatMap(whiteRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      })
    };
  }
});

var AreaScoring = Object.freeze({
  score: function score(game) {
    var blackStonesOnTheBoard = game.intersections().filter(function (intersection) {
      return intersection.isBlack() && !game._isDeadAt(intersection.y, intersection.x);
    });
    var whiteStonesOnTheBoard = game.intersections().filter(function (intersection) {
      return intersection.isWhite() && !game._isDeadAt(intersection.y, intersection.x);
    });
    var territory = game.territory();

    return {
      black: territory.black.length + blackStonesOnTheBoard.length,
      white: territory.white.length + whiteStonesOnTheBoard.length
    };
  },

  territory: function territory(game) {
    var regions = _region2.default.allFor(boardStateWithoutDeadPoints(game));
    var territoryRegions = regions.filter(function (r) {
      return r.isTerritory();
    });
    var blackRegions = territoryRegions.filter(function (r) {
      return r.isBlack();
    });
    var whiteRegions = territoryRegions.filter(function (r) {
      return r.isWhite();
    });

    return {
      black: _utils2.default.flatMap(blackRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      }),
      white: _utils2.default.flatMap(whiteRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      })
    };
  }
});

var Scorer = function Scorer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      scoreBy = _ref.scoreBy,
      komi = _ref.komi;

  this._strategy = {
    "area": AreaScoring,
    "territory": TerritoryScoring,
    "equivalence": AreaScoring
  }[scoreBy];

  this._komi = komi;

  if (!this._strategy) {
    throw new Error("Unknown scoring type: " + scoreBy);
  }

  if (this._komi === null || typeof this._komi === "undefined") {
    throw new Error("Error initializing scorer without a komi value");
  }

  if (typeof this._komi !== "number") {
    throw new Error("Komi value given is not a number: " + komi);
  }

  this._usePassStones = scoreBy === "equivalence";

  Object.freeze(this);
};

Scorer.prototype = {
  score: function score(game) {
    var result = this._strategy.score(game);
    result.white += this._komi;

    if (this._usePassStones) {
      // Under equivalence scoring, 2 consecutive passes signals(!) the end of the
      // game, but just prior to the end of the game, white must make one final
      // pass move if the game didn't end on a white pass.
      //
      // However, instead of creating a 3rd consecutive pass in the board state,
      // white's additional pass stone is handled by the scoring mechanism alone.
      // The idea is that, under any game resumption, the additional white pass
      // stone must not exist, so we shouldn't add it.
      //
      // NOTE: the final result should rely on this scoring function. Any calculations
      // using raw board state pass stone numbers may be off by 1 in favor of black.
      var needsFinalWhitePassStone = game.currentState().color !== "white";

      return {
        black: result.black + game.currentState().whitePassStones + (needsFinalWhitePassStone ? 1 : 0),
        white: result.white + game.currentState().blackPassStones
      };
    } else {
      return result;
    }
  },

  territory: function territory(game) {
    return this._strategy.territory(game);
  },

  usingPassStones: function usingPassStones() {
    return this._usePassStones;
  }
};

exports.default = Scorer;

//# sourceMappingURL=scorer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjb3Jlci5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl91dGlscyIsInJlcXVpcmUiLCJfdXRpbHMyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9pbnRlcnNlY3Rpb24iLCJfaW50ZXJzZWN0aW9uMiIsIl9yZWdpb24iLCJfcmVnaW9uMiIsIl9leWVQb2ludCIsIl9leWVQb2ludDIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsImJvYXJkU3RhdGVXaXRob3V0RGVhZFBvaW50cyIsImdhbWUiLCJjdXJyZW50U3RhdGUiLCJfd2l0aG91dEludGVyc2VjdGlvbnNNYXRjaGluZyIsImkiLCJfaXNEZWFkQXQiLCJ5IiwieCIsImJvYXJkU3RhdGVXaXRob3V0TmV1dHJhbFBvaW50cyIsImJvYXJkU3RhdGUiLCJyZWdpb25zIiwiYWxsRm9yIiwibmV1dHJhbFJlZ2lvbnMiLCJmaWx0ZXIiLCJyIiwiaXNOZXV0cmFsIiwibGVuZ3RoIiwicmVwbGFjZW1lbnRzIiwiZm9yRWFjaCIsInN0YXJ0aW5nWCIsInN0YXJ0aW5nWSIsImludGVyc2VjdGlvbnMiLCJpbnRlcnNlY3Rpb24iLCJtYW5oYXR0YW5EaXN0YW5jZSIsIk1hdGgiLCJhYnMiLCJyZXBsYWNlbWVudENvbG9yIiwicmVwbGFjZW1lbnQiLCJuZXdQb2ludHMiLCJtYXAiLCJfd2l0aE5ld1BvaW50cyIsImJvYXJkU3RhdGVXaXRoQ2xlYXJGYWxzZUV5ZXNGaWxsZWQiLCJ0ZXJyaXRvcnlSZWdpb25zIiwiaXNUZXJyaXRvcnkiLCJmYWxzZUV5ZVBvaW50cyIsImZsYXRNYXAiLCJpc0ZhbHNlIiwicG9pbnRzTmVpZ2hib3JpbmdBdGFyaSIsIm5laWdoYm9yc0ZvciIsInNvbWUiLCJuIiwiaW5BdGFyaSIsIm5ldXRyYWxBdGFyaVVwZGF0ZWRTdGF0ZSIsIl9sb29wIiwiaW5kZXhPZiIsImZpbGxlZENvbG9yIiwiVGVycml0b3J5U2NvcmluZyIsImZyZWV6ZSIsInNjb3JlIiwiYmxhY2tEZWFkQXNDYXB0dXJlcyIsImRlYWRTdG9uZXMiLCJkZWFkUG9pbnQiLCJpbnRlcnNlY3Rpb25BdCIsImlzQmxhY2siLCJ3aGl0ZURlYWRBc0NhcHR1cmVzIiwiaXNXaGl0ZSIsInRlcnJpdG9yeSIsImJsYWNrIiwid2hpdGVTdG9uZXNDYXB0dXJlZCIsIndoaXRlIiwiYmxhY2tTdG9uZXNDYXB0dXJlZCIsInN0YXRlV2l0aG91dERlYWRQb2ludHMiLCJzdGF0ZVdpdGhvdXROZXV0cmFscyIsInN0YXRlV2l0aENsZWFyRmFsc2VFeWVzRmlsbGVkIiwidGVycml0b3J5UmVnaW9uc1dpdGhvdXRTZWtpIiwibWVyZ2VkIiwibWVyZ2UiLCJleWVDb3VudHMiLCJtIiwiY2VpbCIsIm51bWJlck9mRXllcyIsInJlZHVjZSIsImEiLCJiIiwiYmxhY2tSZWdpb25zIiwid2hpdGVSZWdpb25zIiwiQXJlYVNjb3JpbmciLCJibGFja1N0b25lc09uVGhlQm9hcmQiLCJ3aGl0ZVN0b25lc09uVGhlQm9hcmQiLCJTY29yZXIiLCJfcmVmIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwic2NvcmVCeSIsImtvbWkiLCJfc3RyYXRlZ3kiLCJfa29taSIsIkVycm9yIiwiX3VzZVBhc3NTdG9uZXMiLCJwcm90b3R5cGUiLCJyZXN1bHQiLCJuZWVkc0ZpbmFsV2hpdGVQYXNzU3RvbmUiLCJjb2xvciIsIndoaXRlUGFzc1N0b25lcyIsImJsYWNrUGFzc1N0b25lcyIsInVzaW5nUGFzc1N0b25lcyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLElBQUlDLFNBQVNDLFFBQVEsU0FBUixDQUFiOztBQUVBLElBQUlDLFVBQVVDLHVCQUF1QkgsTUFBdkIsQ0FBZDs7QUFFQSxJQUFJSSxnQkFBZ0JILFFBQVEsZ0JBQVIsQ0FBcEI7O0FBRUEsSUFBSUksaUJBQWlC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LEtBQUsyQixLQUFyQjs7QUFFQSxRQUFJLEtBQUtFLGNBQVQsRUFBeUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQUlHLDJCQUEyQjFGLEtBQUtDLFlBQUwsR0FBb0IwRixLQUFwQixLQUE4QixPQUE3RDs7QUFFQSxhQUFPO0FBQ0xuQyxlQUFPaUMsT0FBT2pDLEtBQVAsR0FBZXhELEtBQUtDLFlBQUwsR0FBb0IyRixlQUFuQyxJQUFzREYsMkJBQTJCLENBQTNCLEdBQStCLENBQXJGLENBREY7QUFFTGhDLGVBQU8rQixPQUFPL0IsS0FBUCxHQUFlMUQsS0FBS0MsWUFBTCxHQUFvQjRGO0FBRnJDLE9BQVA7QUFJRCxLQWxCRCxNQWtCTztBQUNMLGFBQU9KLE1BQVA7QUFDRDtBQUNGLEdBMUJnQjs7QUE0QmpCbEMsYUFBVyxTQUFTQSxTQUFULENBQW1CdkQsSUFBbkIsRUFBeUI7QUFDbEMsV0FBTyxLQUFLb0YsU0FBTCxDQUFlN0IsU0FBZixDQUF5QnZELElBQXpCLENBQVA7QUFDRCxHQTlCZ0I7O0FBZ0NqQjhGLG1CQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFdBQU8sS0FBS1AsY0FBWjtBQUNEO0FBbENnQixDQUFuQjs7QUFxQ0F2RyxRQUFRYyxPQUFSLEdBQWtCZ0YsTUFBbEI7O0FBRUEiLCJmaWxlIjoic2NvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxudmFyIF91dGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlscyk7XG5cbnZhciBfaW50ZXJzZWN0aW9uID0gcmVxdWlyZShcIi4vaW50ZXJzZWN0aW9uXCIpO1xuXG52YXIgX2ludGVyc2VjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnRlcnNlY3Rpb24pO1xuXG52YXIgX3JlZ2lvbiA9IHJlcXVpcmUoXCIuL3JlZ2lvblwiKTtcblxudmFyIF9yZWdpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVnaW9uKTtcblxudmFyIF9leWVQb2ludCA9IHJlcXVpcmUoXCIuL2V5ZS1wb2ludFwiKTtcblxudmFyIF9leWVQb2ludDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leWVQb2ludCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBib2FyZFN0YXRlV2l0aG91dERlYWRQb2ludHMgPSBmdW5jdGlvbiBib2FyZFN0YXRlV2l0aG91dERlYWRQb2ludHMoZ2FtZSkge1xuICByZXR1cm4gZ2FtZS5jdXJyZW50U3RhdGUoKS5fd2l0aG91dEludGVyc2VjdGlvbnNNYXRjaGluZyhmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBnYW1lLl9pc0RlYWRBdChpLnksIGkueCk7XG4gIH0pO1xufTtcblxudmFyIGJvYXJkU3RhdGVXaXRob3V0TmV1dHJhbFBvaW50cyA9IGZ1bmN0aW9uIGJvYXJkU3RhdGVXaXRob3V0TmV1dHJhbFBvaW50cyhib2FyZFN0YXRlKSB7XG4gIHZhciByZWdpb25zID0gX3JlZ2lvbjIuZGVmYXVsdC5hbGxGb3IoYm9hcmRTdGF0ZSk7XG4gIHZhciBuZXV0cmFsUmVnaW9ucyA9IHJlZ2lvbnMuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgcmV0dXJuIHIuaXNOZXV0cmFsKCk7XG4gIH0pO1xuXG4gIGlmIChyZWdpb25zLmxlbmd0aCA9PT0gMCB8fCBuZXV0cmFsUmVnaW9ucy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gYm9hcmRTdGF0ZTtcbiAgfVxuXG4gIHZhciByZXBsYWNlbWVudHMgPSB7fTtcblxuICBuZXV0cmFsUmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgdmFyIHN0YXJ0aW5nWCA9IG51bGw7XG4gICAgdmFyIHN0YXJ0aW5nWSA9IG51bGw7XG5cbiAgICByLmludGVyc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICBzdGFydGluZ1ggPSBzdGFydGluZ1ggfHwgaW50ZXJzZWN0aW9uLng7XG4gICAgICBzdGFydGluZ1ggPSBzdGFydGluZ1ggfHwgaW50ZXJzZWN0aW9uLnk7XG5cbiAgICAgIHZhciBtYW5oYXR0YW5EaXN0YW5jZSA9IE1hdGguYWJzKGludGVyc2VjdGlvbi55IC0gc3RhcnRpbmdZKSArIE1hdGguYWJzKGludGVyc2VjdGlvbi54IC0gc3RhcnRpbmdYKTtcbiAgICAgIHZhciByZXBsYWNlbWVudENvbG9yID0gW1wiYmxhY2tcIiwgXCJ3aGl0ZVwiXVttYW5oYXR0YW5EaXN0YW5jZSAlIDJdO1xuICAgICAgdmFyIHJlcGxhY2VtZW50ID0gbmV3IF9pbnRlcnNlY3Rpb24yLmRlZmF1bHQoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54LCByZXBsYWNlbWVudENvbG9yKTtcblxuICAgICAgcmVwbGFjZW1lbnRzW2ludGVyc2VjdGlvbi55XSA9IHJlcGxhY2VtZW50c1tpbnRlcnNlY3Rpb24ueV0gfHwgW107XG4gICAgICByZXBsYWNlbWVudHNbaW50ZXJzZWN0aW9uLnldW2ludGVyc2VjdGlvbi54XSA9IHJlcGxhY2VtZW50O1xuICAgIH0pO1xuICB9KTtcblxuICB2YXIgbmV3UG9pbnRzID0gYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25zLm1hcChmdW5jdGlvbiAoaSkge1xuICAgIGlmIChyZXBsYWNlbWVudHNbaS55XSAmJiByZXBsYWNlbWVudHNbaS55XVtpLnhdKSB7XG4gICAgICByZXR1cm4gcmVwbGFjZW1lbnRzW2kueV1baS54XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYm9hcmRTdGF0ZS5fd2l0aE5ld1BvaW50cyhuZXdQb2ludHMpO1xufTtcblxudmFyIGJvYXJkU3RhdGVXaXRoQ2xlYXJGYWxzZUV5ZXNGaWxsZWQgPSBmdW5jdGlvbiBib2FyZFN0YXRlV2l0aENsZWFyRmFsc2VFeWVzRmlsbGVkKGJvYXJkU3RhdGUpIHtcbiAgdmFyIHRlcnJpdG9yeVJlZ2lvbnMgPSBfcmVnaW9uMi5kZWZhdWx0LmFsbEZvcihib2FyZFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICByZXR1cm4gci5pc1RlcnJpdG9yeSgpO1xuICB9KTtcbiAgdmFyIGZhbHNlRXllUG9pbnRzID0gX3V0aWxzMi5kZWZhdWx0LmZsYXRNYXAodGVycml0b3J5UmVnaW9ucywgZnVuY3Rpb24gKHIpIHtcbiAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zO1xuICB9KS5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gbmV3IF9leWVQb2ludDIuZGVmYXVsdChib2FyZFN0YXRlLCBpKS5pc0ZhbHNlKCk7XG4gIH0pO1xuXG4gIHZhciBwb2ludHNOZWlnaGJvcmluZ0F0YXJpID0gZmFsc2VFeWVQb2ludHMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGJvYXJkU3RhdGUubmVpZ2hib3JzRm9yKGkueSwgaS54KS5zb21lKGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gYm9hcmRTdGF0ZS5pbkF0YXJpKG4ueSwgbi54KTtcbiAgICB9KTtcbiAgfSk7XG4gIHZhciBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUgPSBib2FyZFN0YXRlO1xuXG4gIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKCkge1xuICAgIHZhciBuZXdQb2ludHMgPSBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUuaW50ZXJzZWN0aW9ucy5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIGlmIChwb2ludHNOZWlnaGJvcmluZ0F0YXJpLmluZGV4T2YoaSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gbmV3IF9pbnRlcnNlY3Rpb24yLmRlZmF1bHQoaS55LCBpLngsIG5ldyBfZXllUG9pbnQyLmRlZmF1bHQobmV1dHJhbEF0YXJpVXBkYXRlZFN0YXRlLCBpKS5maWxsZWRDb2xvcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG5ldXRyYWxBdGFyaVVwZGF0ZWRTdGF0ZSA9IG5ldXRyYWxBdGFyaVVwZGF0ZWRTdGF0ZS5fd2l0aE5ld1BvaW50cyhuZXdQb2ludHMpO1xuXG4gICAgdmFyIGJvYXJkU3RhdGUgPSBib2FyZFN0YXRlV2l0aG91dE5ldXRyYWxQb2ludHMobmV1dHJhbEF0YXJpVXBkYXRlZFN0YXRlKTtcbiAgICB2YXIgdGVycml0b3J5UmVnaW9ucyA9IF9yZWdpb24yLmRlZmF1bHQuYWxsRm9yKGJvYXJkU3RhdGUpLmZpbHRlcihmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIuaXNUZXJyaXRvcnkoKTtcbiAgICB9KTtcbiAgICB2YXIgZmFsc2VFeWVQb2ludHMgPSBfdXRpbHMyLmRlZmF1bHQuZmxhdE1hcCh0ZXJyaXRvcnlSZWdpb25zLCBmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIuaW50ZXJzZWN0aW9ucztcbiAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBuZXcgX2V5ZVBvaW50Mi5kZWZhdWx0KGJvYXJkU3RhdGUsIGkpLmlzRmFsc2UoKTtcbiAgICB9KTtcblxuICAgIHBvaW50c05laWdoYm9yaW5nQXRhcmkgPSBmYWxzZUV5ZVBvaW50cy5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUubmVpZ2hib3JzRm9yKGkueSwgaS54KS5zb21lKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUuaW5BdGFyaShuLnksIG4ueCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICB3aGlsZSAocG9pbnRzTmVpZ2hib3JpbmdBdGFyaS5sZW5ndGggPiAwKSB7XG4gICAgX2xvb3AoKTtcbiAgfVxuXG4gIHJldHVybiBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGU7XG59O1xuXG52YXIgVGVycml0b3J5U2NvcmluZyA9IE9iamVjdC5mcmVlemUoe1xuICBzY29yZTogZnVuY3Rpb24gc2NvcmUoZ2FtZSkge1xuICAgIHZhciBibGFja0RlYWRBc0NhcHR1cmVzID0gZ2FtZS5kZWFkU3RvbmVzKCkuZmlsdGVyKGZ1bmN0aW9uIChkZWFkUG9pbnQpIHtcbiAgICAgIHJldHVybiBnYW1lLmludGVyc2VjdGlvbkF0KGRlYWRQb2ludC55LCBkZWFkUG9pbnQueCkuaXNCbGFjaygpO1xuICAgIH0pO1xuICAgIHZhciB3aGl0ZURlYWRBc0NhcHR1cmVzID0gZ2FtZS5kZWFkU3RvbmVzKCkuZmlsdGVyKGZ1bmN0aW9uIChkZWFkUG9pbnQpIHtcbiAgICAgIHJldHVybiBnYW1lLmludGVyc2VjdGlvbkF0KGRlYWRQb2ludC55LCBkZWFkUG9pbnQueCkuaXNXaGl0ZSgpO1xuICAgIH0pO1xuXG4gICAgdmFyIHRlcnJpdG9yeSA9IGdhbWUudGVycml0b3J5KCk7XG4gICAgdmFyIGJvYXJkU3RhdGUgPSBnYW1lLmN1cnJlbnRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJsYWNrOiB0ZXJyaXRvcnkuYmxhY2subGVuZ3RoICsgYm9hcmRTdGF0ZS53aGl0ZVN0b25lc0NhcHR1cmVkICsgd2hpdGVEZWFkQXNDYXB0dXJlcy5sZW5ndGgsXG4gICAgICB3aGl0ZTogdGVycml0b3J5LndoaXRlLmxlbmd0aCArIGJvYXJkU3RhdGUuYmxhY2tTdG9uZXNDYXB0dXJlZCArIGJsYWNrRGVhZEFzQ2FwdHVyZXMubGVuZ3RoXG4gICAgfTtcbiAgfSxcblxuICB0ZXJyaXRvcnk6IGZ1bmN0aW9uIHRlcnJpdG9yeShnYW1lKSB7XG4gICAgdmFyIHN0YXRlV2l0aG91dERlYWRQb2ludHMgPSBib2FyZFN0YXRlV2l0aG91dERlYWRQb2ludHMoZ2FtZSk7XG4gICAgdmFyIHN0YXRlV2l0aG91dE5ldXRyYWxzID0gYm9hcmRTdGF0ZVdpdGhvdXROZXV0cmFsUG9pbnRzKHN0YXRlV2l0aG91dERlYWRQb2ludHMpO1xuICAgIHZhciBzdGF0ZVdpdGhDbGVhckZhbHNlRXllc0ZpbGxlZCA9IGJvYXJkU3RhdGVXaXRoQ2xlYXJGYWxzZUV5ZXNGaWxsZWQoc3RhdGVXaXRob3V0TmV1dHJhbHMpO1xuXG4gICAgdmFyIHRlcnJpdG9yeVJlZ2lvbnMgPSBfcmVnaW9uMi5kZWZhdWx0LmFsbEZvcihzdGF0ZVdpdGhDbGVhckZhbHNlRXllc0ZpbGxlZCkuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pc1RlcnJpdG9yeSgpO1xuICAgIH0pO1xuXG4gICAgdmFyIHRlcnJpdG9yeVJlZ2lvbnNXaXRob3V0U2VraSA9IHRlcnJpdG9yeVJlZ2lvbnMuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICB2YXIgbWVyZ2VkID0gX3JlZ2lvbjIuZGVmYXVsdC5tZXJnZSh0ZXJyaXRvcnlSZWdpb25zLCByKTtcbiAgICAgIHZhciBleWVDb3VudHMgPSBtZXJnZWQubWFwKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwobS5udW1iZXJPZkV5ZXMoKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGV5ZUNvdW50cy5sZW5ndGggPiAwICYmIGV5ZUNvdW50cy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgfSkgPj0gMjtcbiAgICB9KTtcblxuICAgIHZhciBibGFja1JlZ2lvbnMgPSB0ZXJyaXRvcnlSZWdpb25zV2l0aG91dFNla2kuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pc0JsYWNrKCk7XG4gICAgfSk7XG4gICAgdmFyIHdoaXRlUmVnaW9ucyA9IHRlcnJpdG9yeVJlZ2lvbnNXaXRob3V0U2VraS5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiByLmlzV2hpdGUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBibGFjazogX3V0aWxzMi5kZWZhdWx0LmZsYXRNYXAoYmxhY2tSZWdpb25zLCBmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB7IHk6IGkueSwgeDogaS54IH07XG4gICAgICB9KSxcbiAgICAgIHdoaXRlOiBfdXRpbHMyLmRlZmF1bHQuZmxhdE1hcCh3aGl0ZVJlZ2lvbnMsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHJldHVybiByLmludGVyc2VjdGlvbnM7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHsgeTogaS55LCB4OiBpLnggfTtcbiAgICAgIH0pXG4gICAgfTtcbiAgfVxufSk7XG5cbnZhciBBcmVhU2NvcmluZyA9IE9iamVjdC5mcmVlemUoe1xuICBzY29yZTogZnVuY3Rpb24gc2NvcmUoZ2FtZSkge1xuICAgIHZhciBibGFja1N0b25lc09uVGhlQm9hcmQgPSBnYW1lLmludGVyc2VjdGlvbnMoKS5maWx0ZXIoZnVuY3Rpb24gKGludGVyc2VjdGlvbikge1xuICAgICAgcmV0dXJuIGludGVyc2VjdGlvbi5pc0JsYWNrKCkgJiYgIWdhbWUuX2lzRGVhZEF0KGludGVyc2VjdGlvbi55LCBpbnRlcnNlY3Rpb24ueCk7XG4gICAgfSk7XG4gICAgdmFyIHdoaXRlU3RvbmVzT25UaGVCb2FyZCA9IGdhbWUuaW50ZXJzZWN0aW9ucygpLmZpbHRlcihmdW5jdGlvbiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICByZXR1cm4gaW50ZXJzZWN0aW9uLmlzV2hpdGUoKSAmJiAhZ2FtZS5faXNEZWFkQXQoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54KTtcbiAgICB9KTtcbiAgICB2YXIgdGVycml0b3J5ID0gZ2FtZS50ZXJyaXRvcnkoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBibGFjazogdGVycml0b3J5LmJsYWNrLmxlbmd0aCArIGJsYWNrU3RvbmVzT25UaGVCb2FyZC5sZW5ndGgsXG4gICAgICB3aGl0ZTogdGVycml0b3J5LndoaXRlLmxlbmd0aCArIHdoaXRlU3RvbmVzT25UaGVCb2FyZC5sZW5ndGhcbiAgICB9O1xuICB9LFxuXG4gIHRlcnJpdG9yeTogZnVuY3Rpb24gdGVycml0b3J5KGdhbWUpIHtcbiAgICB2YXIgcmVnaW9ucyA9IF9yZWdpb24yLmRlZmF1bHQuYWxsRm9yKGJvYXJkU3RhdGVXaXRob3V0RGVhZFBvaW50cyhnYW1lKSk7XG4gICAgdmFyIHRlcnJpdG9yeVJlZ2lvbnMgPSByZWdpb25zLmZpbHRlcihmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIuaXNUZXJyaXRvcnkoKTtcbiAgICB9KTtcbiAgICB2YXIgYmxhY2tSZWdpb25zID0gdGVycml0b3J5UmVnaW9ucy5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiByLmlzQmxhY2soKTtcbiAgICB9KTtcbiAgICB2YXIgd2hpdGVSZWdpb25zID0gdGVycml0b3J5UmVnaW9ucy5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiByLmlzV2hpdGUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBibGFjazogX3V0aWxzMi5kZWZhdWx0LmZsYXRNYXAoYmxhY2tSZWdpb25zLCBmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB7IHk6IGkueSwgeDogaS54IH07XG4gICAgICB9KSxcbiAgICAgIHdoaXRlOiBfdXRpbHMyLmRlZmF1bHQuZmxhdE1hcCh3aGl0ZVJlZ2lvbnMsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHJldHVybiByLmludGVyc2VjdGlvbnM7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHsgeTogaS55LCB4OiBpLnggfTtcbiAgICAgIH0pXG4gICAgfTtcbiAgfVxufSk7XG5cbnZhciBTY29yZXIgPSBmdW5jdGlvbiBTY29yZXIoKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIHNjb3JlQnkgPSBfcmVmLnNjb3JlQnksXG4gICAgICBrb21pID0gX3JlZi5rb21pO1xuXG4gIHRoaXMuX3N0cmF0ZWd5ID0ge1xuICAgIFwiYXJlYVwiOiBBcmVhU2NvcmluZyxcbiAgICBcInRlcnJpdG9yeVwiOiBUZXJyaXRvcnlTY29yaW5nLFxuICAgIFwiZXF1aXZhbGVuY2VcIjogQXJlYVNjb3JpbmdcbiAgfVtzY29yZUJ5XTtcblxuICB0aGlzLl9rb21pID0ga29taTtcblxuICBpZiAoIXRoaXMuX3N0cmF0ZWd5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBzY29yaW5nIHR5cGU6IFwiICsgc2NvcmVCeSk7XG4gIH1cblxuICBpZiAodGhpcy5fa29taSA9PT0gbnVsbCB8fCB0eXBlb2YgdGhpcy5fa29taSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBzY29yZXIgd2l0aG91dCBhIGtvbWkgdmFsdWVcIik7XG4gIH1cblxuICBpZiAodHlwZW9mIHRoaXMuX2tvbWkgIT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJLb21pIHZhbHVlIGdpdmVuIGlzIG5vdCBhIG51bWJlcjogXCIgKyBrb21pKTtcbiAgfVxuXG4gIHRoaXMuX3VzZVBhc3NTdG9uZXMgPSBzY29yZUJ5ID09PSBcImVxdWl2YWxlbmNlXCI7XG5cbiAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbn07XG5cblNjb3Jlci5wcm90b3R5cGUgPSB7XG4gIHNjb3JlOiBmdW5jdGlvbiBzY29yZShnYW1lKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX3N0cmF0ZWd5LnNjb3JlKGdhbWUpO1xuICAgIHJlc3VsdC53aGl0ZSArPSB0aGlzLl9rb21pO1xuXG4gICAgaWYgKHRoaXMuX3VzZVBhc3NTdG9uZXMpIHtcbiAgICAgIC8vIFVuZGVyIGVxdWl2YWxlbmNlIHNjb3JpbmcsIDIgY29uc2VjdXRpdmUgcGFzc2VzIHNpZ25hbHMoISkgdGhlIGVuZCBvZiB0aGVcbiAgICAgIC8vIGdhbWUsIGJ1dCBqdXN0IHByaW9yIHRvIHRoZSBlbmQgb2YgdGhlIGdhbWUsIHdoaXRlIG11c3QgbWFrZSBvbmUgZmluYWxcbiAgICAgIC8vIHBhc3MgbW92ZSBpZiB0aGUgZ2FtZSBkaWRuJ3QgZW5kIG9uIGEgd2hpdGUgcGFzcy5cbiAgICAgIC8vXG4gICAgICAvLyBIb3dldmVyLCBpbnN0ZWFkIG9mIGNyZWF0aW5nIGEgM3JkIGNvbnNlY3V0aXZlIHBhc3MgaW4gdGhlIGJvYXJkIHN0YXRlLFxuICAgICAgLy8gd2hpdGUncyBhZGRpdGlvbmFsIHBhc3Mgc3RvbmUgaXMgaGFuZGxlZCBieSB0aGUgc2NvcmluZyBtZWNoYW5pc20gYWxvbmUuXG4gICAgICAvLyBUaGUgaWRlYSBpcyB0aGF0LCB1bmRlciBhbnkgZ2FtZSByZXN1bXB0aW9uLCB0aGUgYWRkaXRpb25hbCB3aGl0ZSBwYXNzXG4gICAgICAvLyBzdG9uZSBtdXN0IG5vdCBleGlzdCwgc28gd2Ugc2hvdWxkbid0IGFkZCBpdC5cbiAgICAgIC8vXG4gICAgICAvLyBOT1RFOiB0aGUgZmluYWwgcmVzdWx0IHNob3VsZCByZWx5IG9uIHRoaXMgc2NvcmluZyBmdW5jdGlvbi4gQW55IGNhbGN1bGF0aW9uc1xuICAgICAgLy8gdXNpbmcgcmF3IGJvYXJkIHN0YXRlIHBhc3Mgc3RvbmUgbnVtYmVycyBtYXkgYmUgb2ZmIGJ5IDEgaW4gZmF2b3Igb2YgYmxhY2suXG4gICAgICB2YXIgbmVlZHNGaW5hbFdoaXRlUGFzc1N0b25lID0gZ2FtZS5jdXJyZW50U3RhdGUoKS5jb2xvciAhPT0gXCJ3aGl0ZVwiO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBibGFjazogcmVzdWx0LmJsYWNrICsgZ2FtZS5jdXJyZW50U3RhdGUoKS53aGl0ZVBhc3NTdG9uZXMgKyAobmVlZHNGaW5hbFdoaXRlUGFzc1N0b25lID8gMSA6IDApLFxuICAgICAgICB3aGl0ZTogcmVzdWx0LndoaXRlICsgZ2FtZS5jdXJyZW50U3RhdGUoKS5ibGFja1Bhc3NTdG9uZXNcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9LFxuXG4gIHRlcnJpdG9yeTogZnVuY3Rpb24gdGVycml0b3J5KGdhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyYXRlZ3kudGVycml0b3J5KGdhbWUpO1xuICB9LFxuXG4gIHVzaW5nUGFzc1N0b25lczogZnVuY3Rpb24gdXNpbmdQYXNzU3RvbmVzKCkge1xuICAgIHJldHVybiB0aGlzLl91c2VQYXNzU3RvbmVzO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTY29yZXI7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjb3Jlci5qcy5tYXAiXX0=
},{"./eye-point":5,"./intersection":7,"./region":9,"./utils":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _renderer = require("./renderer");

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var SVGRenderer = function SVGRenderer(boardElement, _ref) {
  var hooks = _ref.hooks,
      options = _ref.options;

  _renderer2.default.call(this, boardElement, { hooks: hooks, options: options });
  _utils2.default.addClass(boardElement, "tenuki-svg-renderer");
};

SVGRenderer.prototype = Object.create(_renderer2.default.prototype);
SVGRenderer.prototype.constructor = SVGRenderer;

var CACHED_CONSTRUCTED_LINES = {};

var constructSVG = function constructSVG(renderer, boardState, _ref2) {
  var hasCoordinates = _ref2.hasCoordinates,
      smallerStones = _ref2.smallerStones,
      flatStones = _ref2.flatStones;

  var cacheKey = [boardState.boardSize, hasCoordinates, smallerStones, flatStones].toString();

  var svg = _utils2.default.createSVGElement("svg");
  var defs = _utils2.default.createSVGElement("defs");
  _utils2.default.appendElement(svg, defs);

  var blackGradient = _utils2.default.createSVGElement("radialGradient", {
    attributes: {
      id: renderer.blackGradientID,
      cy: "15%",
      r: "50%"
    }
  });
  _utils2.default.appendElement(blackGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "0%",
      "stop-color": "hsl(0, 0%, 38%)"
    }
  }));
  _utils2.default.appendElement(blackGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "100%",
      "stop-color": "#39363D"
    }
  }));
  _utils2.default.appendElement(defs, blackGradient);

  var whiteGradient = _utils2.default.createSVGElement("radialGradient", {
    attributes: {
      id: renderer.whiteGradientID,
      cy: "15%",
      r: "50%"
    }
  });
  _utils2.default.appendElement(whiteGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "0%",
      "stop-color": "#FFFFFF"
    }
  }));
  _utils2.default.appendElement(whiteGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "100%",
      "stop-color": "#fafdfc"
    }
  }));
  _utils2.default.appendElement(defs, whiteGradient);

  var contentsContainer = _utils2.default.createSVGElement("g", {
    attributes: {
      class: "contents",
      transform: "translate(" + renderer.MARGIN + ", " + renderer.MARGIN + ")"
    }
  });
  _utils2.default.appendElement(svg, contentsContainer);

  var lines = void 0;

  if (CACHED_CONSTRUCTED_LINES[cacheKey]) {
    lines = _utils2.default.clone(CACHED_CONSTRUCTED_LINES[cacheKey]);
  } else {
    lines = _utils2.default.createSVGElement("g", {
      attributes: {
        class: "lines"
      }
    });

    for (var y = 0; y < boardState.boardSize - 1; y++) {
      for (var x = 0; x < boardState.boardSize - 1; x++) {
        var lineBox = _utils2.default.createSVGElement("rect", {
          attributes: {
            y: y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
            x: x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
            width: renderer.INTERSECTION_GAP_SIZE + 1,
            height: renderer.INTERSECTION_GAP_SIZE + 1,
            class: "line-box"
          }
        });

        _utils2.default.appendElement(lines, lineBox);
      }
    }

    CACHED_CONSTRUCTED_LINES[cacheKey] = lines;
  }

  _utils2.default.appendElement(contentsContainer, lines);

  var hoshiPoints = _utils2.default.createSVGElement("g", { attributes: { class: "hoshi" } });
  _utils2.default.appendElement(contentsContainer, hoshiPoints);

  _renderer2.default.hoshiPositionsFor(boardState.boardSize).forEach(function (h) {
    var hoshi = _utils2.default.createSVGElement("circle", {
      attributes: {
        class: "hoshi",
        cy: h.top * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        cx: h.left * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        r: 2
      }
    });

    _utils2.default.appendElement(hoshiPoints, hoshi);
  });

  if (hasCoordinates) {
    (function () {
      var coordinateContainer = _utils2.default.createSVGElement("g", {
        attributes: {
          class: "coordinates",
          transform: "translate(" + renderer.MARGIN + ", " + renderer.MARGIN + ")"
        }
      });

      var _loop = function _loop(_y) {
        // TODO: 16 is for the rendered height _on my browser_. not reliable...

        [16 / 2 + 1 - (16 + 16 / 2 + 16 / (2 * 2) + 16 / (2 * 2 * 2)), 16 / 2 + 1 + (16 + 16 / 2) + (boardState.boardSize - 1) * (renderer.INTERSECTION_GAP_SIZE + 1)].forEach(function (verticalOffset) {
          _utils2.default.appendElement(coordinateContainer, _utils2.default.createSVGElement("text", {
            text: boardState.xCoordinateFor(_y),
            attributes: {
              "text-anchor": "middle",
              y: verticalOffset - 0.5,
              x: _y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5
            }
          }));
        });

        [-1 * (16 + 16 / 2 + 16 / (2 * 2)), 16 + 16 / 2 + 16 / (2 * 2) + (boardState.boardSize - 1) * (renderer.INTERSECTION_GAP_SIZE + 1)].forEach(function (horizontalOffset) {
          _utils2.default.appendElement(coordinateContainer, _utils2.default.createSVGElement("text", {
            text: boardState.yCoordinateFor(_y),
            attributes: {
              "text-anchor": "middle",
              y: _y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5 + 16 / (2 * 2),
              x: horizontalOffset - 0.5
            }
          }));
        });

        _utils2.default.appendElement(svg, coordinateContainer);
      };

      for (var _y = 0; _y < boardState.boardSize; _y++) {
        _loop(_y);
      }
    })();
  }

  var intersections = _utils2.default.createSVGElement("g", { attributes: { class: "intersections" } });

  for (var _y2 = 0; _y2 < boardState.boardSize; _y2++) {
    for (var _x = 0; _x < boardState.boardSize; _x++) {
      var intersectionGroup = _utils2.default.createSVGElement("g", {
        attributes: {
          class: "intersection"
        }
      });
      intersectionGroup.setAttribute("data-intersection-y", _y2);
      intersectionGroup.setAttribute("data-intersection-x", _x);
      _utils2.default.appendElement(intersections, intersectionGroup);

      var intersectionInnerContainer = _utils2.default.createSVGElement("g", {
        attributes: {
          class: "intersection-inner-container"
        }
      });
      _utils2.default.appendElement(intersectionGroup, intersectionInnerContainer);

      var intersectionBox = _utils2.default.createSVGElement("rect", {
        attributes: {
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - renderer.INTERSECTION_GAP_SIZE / 2 - 0.5,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - renderer.INTERSECTION_GAP_SIZE / 2 - 0.5,
          width: renderer.INTERSECTION_GAP_SIZE,
          height: renderer.INTERSECTION_GAP_SIZE
        }
      });
      _utils2.default.appendElement(intersectionInnerContainer, intersectionBox);

      var stoneRadius = renderer.INTERSECTION_GAP_SIZE / 2;

      if (smallerStones) {
        stoneRadius -= 1;
      }

      var stoneAttributes = {
        class: "stone",
        cy: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        cx: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        r: stoneRadius
      };

      if (!flatStones) {
        _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("circle", {
          attributes: {
            class: "stone-shadow",
            cy: stoneAttributes["cy"] + 2,
            cx: stoneAttributes["cx"],
            r: stoneRadius
          }
        }));
      }

      var intersection = _utils2.default.createSVGElement("circle", {
        attributes: stoneAttributes
      });
      _utils2.default.appendElement(intersectionInnerContainer, intersection);

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("circle", {
        attributes: {
          class: "marker",
          cy: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          cx: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          r: 4.5
        }
      }));

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("rect", {
        attributes: {
          class: "ko-marker",
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 6 - 0.5,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 6 - 0.5,
          width: 12,
          height: 12
        }
      }));

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("rect", {
        attributes: {
          class: "territory-marker",
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          width: 11,
          height: 11
        }
      }));

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("circle", {
        attributes: {
          class: "circle-label",
          cy: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          cx: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          r: 8
        }
      }));

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("rect", {
        attributes: {
          class: "square-label",
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          width: 11,
          height: 11
        }
      }));

      var pos = {
        x: _y2 * renderer.INTERSECTION_GAP_SIZE + _y2 - 0.5,
        y: _x * renderer.INTERSECTION_GAP_SIZE + _x - 2,
        w: renderer.INTERSECTION_GAP_SIZE / 4,
        h: renderer.INTERSECTION_GAP_SIZE / 4
      };

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("polygon", {
        attributes: {
          class: "triangle-label",
          points: String(pos.x + "," + (pos.y - pos.h) + " " + (pos.x - pos.w) + "," + (pos.y + pos.h) + " " + (pos.x + pos.w) + "," + (pos.y + pos.h))
        }
      }));

      var letters = ['a', 'b', 'c'];

      for (var i = 0; i < letters.length; ++i) {
        _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("text", {
          attributes: {
            class: letters[i] + "-label",
            y: _y2 * renderer.INTERSECTION_GAP_SIZE + _y2,
            x: _x * renderer.INTERSECTION_GAP_SIZE + _x,
            "text-anchor": "middle",
            "dominant-baseline": "middle"
          },
          text: letters[i].toUpperCase()
        }));
      }

      renderer.grid[_y2] = renderer.grid[_y2] || [];
      renderer.grid[_y2][_x] = intersectionGroup;

      renderer.addIntersectionEventListeners(intersectionGroup, _y2, _x);
    }
  }

  _utils2.default.appendElement(contentsContainer, intersections);

  return svg;
};

SVGRenderer.prototype.generateBoard = function (boardState, _ref3) {
  var hasCoordinates = _ref3.hasCoordinates,
      smallerStones = _ref3.smallerStones,
      flatStones = _ref3.flatStones;

  this.blackGradientID = _utils2.default.randomID("black-gradient");
  this.whiteGradientID = _utils2.default.randomID("white-gradient");

  var svg = constructSVG(this, boardState, { hasCoordinates: hasCoordinates, smallerStones: smallerStones, flatStones: flatStones });

  this.svgElement = svg;
  this.svgElement.setAttribute("height", this.BOARD_LENGTH);
  this.svgElement.setAttribute("width", this.BOARD_LENGTH);

  return svg;
};

SVGRenderer.prototype.computeSizing = function () {
  var _this = this;

  _renderer2.default.prototype.computeSizing.call(this);

  // In addition to the will-change re-raster in Renderer,
  // the SVG element appears to sometimes need this to
  // prevent blurriness on resize.
  this.svgElement.style.transform = "none";

  window.requestAnimationFrame(function () {
    _this.svgElement.style.transform = "";
  });
};

SVGRenderer.prototype.setIntersectionClasses = function (intersectionEl, intersection, classes) {
  if (intersectionEl.getAttribute("class") !== classes.join(" ")) {
    intersectionEl.setAttribute("class", classes.join(" "));
  }

  if (!this.flatStones) {
    if (intersection.isEmpty()) {
      intersectionEl.querySelector(".stone").setAttribute("style", "");
    } else {
      var base = window.location.href.split('#')[0];
      intersectionEl.querySelector(".stone").setAttribute("style", "fill: url(" + base + "#" + this[intersection.value + "GradientID"] + ")");
    }
  }
};

exports.default = SVGRenderer;

//# sourceMappingURL=svg-renderer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN2Zy1yZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl91dGlscyIsInJlcXVpcmUiLCJfdXRpbHMyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9yZW5kZXJlciIsIl9yZW5kZXJlcjIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIlNWR1JlbmRlcmVyIiwiYm9hcmRFbGVtZW50IiwiX3JlZiIsImhvb2tzIiwib3B0aW9ucyIsImNhbGwiLCJhZGRDbGFzcyIsInByb3RvdHlwZSIsImNyZWF0ZSIsImNvbnN0cnVjdG9yIiwiQ0FDSEVEX0NPTlNUUlVDVEVEX0xJTkVTIiwiY29uc3RydWN0U1ZHIiwicmVuZGVyZXIiLCJib2FyZFN0YXRlIiwiX3JlZjIiLCJoYXNDb29yZGluYXRlcyIsInNtYWxsZXJTdG9uZXMiLCJmbGF0U3RvbmVzIiwiY2FjaGVLZXkiLCJib2FyZFNpemUiLCJ0b1N0cmluZyIsInN2ZyIsImNyZWF0ZVNWR0VsZW1lbnQiLCJkZWZzIiwiYXBwZW5kRWxlbWVudCIsImJsYWNrR3JhZGllbnQiLCJhdHRyaWJ1dGVzIiwiaWQiLCJibGFja0dyYWRpZW50SUQiLCJjeSIsInIiLCJvZmZzZXQiLCJ3aGl0ZUdyYWRpZW50Iiwid2hpdGVHcmFkaWVudElEIiwiY29udGVudHNDb250YWluZXIiLCJjbGFzcyIsInRyYW5zZm9ybSIsIk1BUkdJTiIsImxpbmVzIiwiY2xvbmUiLCJ5IiwieCIsImxpbmVCb3giLCJJTlRFUlNFQ1RJT05fR0FQX1NJWkUiLCJ3aWR0aCIsImhlaWdodCIsImhvc2hpUG9pbnRzIiwiaG9zaGlQb3NpdGlvbnNGb3IiLCJmb3JFYWNoIiwiaCIsImhvc2hpIiwidG9wIiwiY3giLCJsZWZ0IiwiY29vcmRpbmF0ZUNvbnRhaW5lciIsIl9sb29wIiwiX3kiLCJ2ZXJ0aWNhbE9mZnNldCIsInRleHQiLCJ4Q29vcmRpbmF0ZUZvciIsImhvcml6b250YWxPZmZzZXQiLCJ5Q29vcmRpbmF0ZUZvciIsImludGVyc2VjdGlvbnMiLCJfeTIiLCJfeCIsImludGVyc2VjdGlvbkdyb3VwIiwic2V0QXR0cmlidXRlIiwiaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIiLCJpbnRlcnNlY3Rpb25Cb3giLCJzdG9uZVJhZGl1cyIsInN0b25lQXR0cmlidXRlcyIsImludGVyc2VjdGlvbiIsInBvcyIsInciLCJwb2ludHMiLCJTdHJpbmciLCJsZXR0ZXJzIiwiaSIsImxlbmd0aCIsInRvVXBwZXJDYXNlIiwiZ3JpZCIsImFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzIiwiZ2VuZXJhdGVCb2FyZCIsIl9yZWYzIiwicmFuZG9tSUQiLCJzdmdFbGVtZW50IiwiQk9BUkRfTEVOR1RIIiwiY29tcHV0ZVNpemluZyIsIl90aGlzIiwic3R5bGUiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzZXRJbnRlcnNlY3Rpb25DbGFzc2VzIiwiaW50ZXJzZWN0aW9uRWwiLCJjbGFzc2VzIiwiZ2V0QXR0cmlidXRlIiwiam9pbiIsImlzRW1wdHkiLCJxdWVyeVNlbGVjdG9yIiwiYmFzZSIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSUMsU0FBU0MsUUFBUSxTQUFSLENBQWI7O0FBRUEsSUFBSUMsVUFBVUMsdUJBQXVCSCxNQUF2QixDQUFkOztBQUVBLElBQUlJLFlBQVlILFFBQVEsWUFBUixDQUFoQjs7QUFFQSxJQUFJSSxhQUFhRix1QkFBdUJDLFNBQXZCLENBQWpCOztBQUVBLFNBQVNELHNCQUFULENBQWdDRyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLE9BQU9BLElBQUlDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCLEVBQUVFLFNBQVNGLEdBQVgsRUFBckM7QUFBd0Q7O0FBRS9G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LENBQXVCckQsU0FBdkIsR0FBbUMsRUFBbkM7QUFDRCxHQUZEO0FBR0QsQ0FiRDs7QUFlQXBDLFlBQVlPLFNBQVosQ0FBc0JxRixzQkFBdEIsR0FBK0MsVUFBVUMsY0FBVixFQUEwQnRCLFlBQTFCLEVBQXdDdUIsT0FBeEMsRUFBaUQ7QUFDOUYsTUFBSUQsZUFBZUUsWUFBZixDQUE0QixPQUE1QixNQUF5Q0QsUUFBUUUsSUFBUixDQUFhLEdBQWIsQ0FBN0MsRUFBZ0U7QUFDOURILG1CQUFlM0IsWUFBZixDQUE0QixPQUE1QixFQUFxQzRCLFFBQVFFLElBQVIsQ0FBYSxHQUFiLENBQXJDO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDLEtBQUsvRSxVQUFWLEVBQXNCO0FBQ3BCLFFBQUlzRCxhQUFhMEIsT0FBYixFQUFKLEVBQTRCO0FBQzFCSixxQkFBZUssYUFBZixDQUE2QixRQUE3QixFQUF1Q2hDLFlBQXZDLENBQW9ELE9BQXBELEVBQTZELEVBQTdEO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBSWlDLE9BQU9ULE9BQU9VLFFBQVAsQ0FBZ0JDLElBQWhCLENBQXFCQyxLQUFyQixDQUEyQixHQUEzQixFQUFnQyxDQUFoQyxDQUFYO0FBQ0FULHFCQUFlSyxhQUFmLENBQTZCLFFBQTdCLEVBQXVDaEMsWUFBdkMsQ0FBb0QsT0FBcEQsRUFBNkQsZUFBZWlDLElBQWYsR0FBc0IsR0FBdEIsR0FBNEIsS0FBSzVCLGFBQWFqRixLQUFiLEdBQXFCLFlBQTFCLENBQTVCLEdBQXNFLEdBQW5JO0FBQ0Q7QUFDRjtBQUNGLENBYkQ7O0FBZUFELFFBQVFVLE9BQVIsR0FBa0JDLFdBQWxCOztBQUVBIiwiZmlsZSI6InN2Zy1yZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbnZhciBfdXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHMpO1xuXG52YXIgX3JlbmRlcmVyID0gcmVxdWlyZShcIi4vcmVuZGVyZXJcIik7XG5cbnZhciBfcmVuZGVyZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVuZGVyZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU1ZHUmVuZGVyZXIgPSBmdW5jdGlvbiBTVkdSZW5kZXJlcihib2FyZEVsZW1lbnQsIF9yZWYpIHtcbiAgdmFyIGhvb2tzID0gX3JlZi5ob29rcyxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG5cbiAgX3JlbmRlcmVyMi5kZWZhdWx0LmNhbGwodGhpcywgYm9hcmRFbGVtZW50LCB7IGhvb2tzOiBob29rcywgb3B0aW9uczogb3B0aW9ucyB9KTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKGJvYXJkRWxlbWVudCwgXCJ0ZW51a2ktc3ZnLXJlbmRlcmVyXCIpO1xufTtcblxuU1ZHUmVuZGVyZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShfcmVuZGVyZXIyLmRlZmF1bHQucHJvdG90eXBlKTtcblNWR1JlbmRlcmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNWR1JlbmRlcmVyO1xuXG52YXIgQ0FDSEVEX0NPTlNUUlVDVEVEX0xJTkVTID0ge307XG5cbnZhciBjb25zdHJ1Y3RTVkcgPSBmdW5jdGlvbiBjb25zdHJ1Y3RTVkcocmVuZGVyZXIsIGJvYXJkU3RhdGUsIF9yZWYyKSB7XG4gIHZhciBoYXNDb29yZGluYXRlcyA9IF9yZWYyLmhhc0Nvb3JkaW5hdGVzLFxuICAgICAgc21hbGxlclN0b25lcyA9IF9yZWYyLnNtYWxsZXJTdG9uZXMsXG4gICAgICBmbGF0U3RvbmVzID0gX3JlZjIuZmxhdFN0b25lcztcblxuICB2YXIgY2FjaGVLZXkgPSBbYm9hcmRTdGF0ZS5ib2FyZFNpemUsIGhhc0Nvb3JkaW5hdGVzLCBzbWFsbGVyU3RvbmVzLCBmbGF0U3RvbmVzXS50b1N0cmluZygpO1xuXG4gIHZhciBzdmcgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInN2Z1wiKTtcbiAgdmFyIGRlZnMgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImRlZnNcIik7XG4gIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KHN2ZywgZGVmcyk7XG5cbiAgdmFyIGJsYWNrR3JhZGllbnQgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInJhZGlhbEdyYWRpZW50XCIsIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBpZDogcmVuZGVyZXIuYmxhY2tHcmFkaWVudElELFxuICAgICAgY3k6IFwiMTUlXCIsXG4gICAgICByOiBcIjUwJVwiXG4gICAgfVxuICB9KTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoYmxhY2tHcmFkaWVudCwgX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJzdG9wXCIsIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBvZmZzZXQ6IFwiMCVcIixcbiAgICAgIFwic3RvcC1jb2xvclwiOiBcImhzbCgwLCAwJSwgMzglKVwiXG4gICAgfVxuICB9KSk7XG4gIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGJsYWNrR3JhZGllbnQsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwic3RvcFwiLCB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgb2Zmc2V0OiBcIjEwMCVcIixcbiAgICAgIFwic3RvcC1jb2xvclwiOiBcIiMzOTM2M0RcIlxuICAgIH1cbiAgfSkpO1xuICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChkZWZzLCBibGFja0dyYWRpZW50KTtcblxuICB2YXIgd2hpdGVHcmFkaWVudCA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwicmFkaWFsR3JhZGllbnRcIiwge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGlkOiByZW5kZXJlci53aGl0ZUdyYWRpZW50SUQsXG4gICAgICBjeTogXCIxNSVcIixcbiAgICAgIHI6IFwiNTAlXCJcbiAgICB9XG4gIH0pO1xuICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudCh3aGl0ZUdyYWRpZW50LCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInN0b3BcIiwge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIG9mZnNldDogXCIwJVwiLFxuICAgICAgXCJzdG9wLWNvbG9yXCI6IFwiI0ZGRkZGRlwiXG4gICAgfVxuICB9KSk7XG4gIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KHdoaXRlR3JhZGllbnQsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwic3RvcFwiLCB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgb2Zmc2V0OiBcIjEwMCVcIixcbiAgICAgIFwic3RvcC1jb2xvclwiOiBcIiNmYWZkZmNcIlxuICAgIH1cbiAgfSkpO1xuICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChkZWZzLCB3aGl0ZUdyYWRpZW50KTtcblxuICB2YXIgY29udGVudHNDb250YWluZXIgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImdcIiwge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGNsYXNzOiBcImNvbnRlbnRzXCIsXG4gICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKFwiICsgcmVuZGVyZXIuTUFSR0lOICsgXCIsIFwiICsgcmVuZGVyZXIuTUFSR0lOICsgXCIpXCJcbiAgICB9XG4gIH0pO1xuICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChzdmcsIGNvbnRlbnRzQ29udGFpbmVyKTtcblxuICB2YXIgbGluZXMgPSB2b2lkIDA7XG5cbiAgaWYgKENBQ0hFRF9DT05TVFJVQ1RFRF9MSU5FU1tjYWNoZUtleV0pIHtcbiAgICBsaW5lcyA9IF91dGlsczIuZGVmYXVsdC5jbG9uZShDQUNIRURfQ09OU1RSVUNURURfTElORVNbY2FjaGVLZXldKTtcbiAgfSBlbHNlIHtcbiAgICBsaW5lcyA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwiZ1wiLCB7XG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGNsYXNzOiBcImxpbmVzXCJcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxOyB5KyspIHtcbiAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxOyB4KyspIHtcbiAgICAgICAgdmFyIGxpbmVCb3ggPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInJlY3RcIiwge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIHk6IHkgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjUsXG4gICAgICAgICAgICB4OiB4ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41LFxuICAgICAgICAgICAgd2lkdGg6IHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEsXG4gICAgICAgICAgICBjbGFzczogXCJsaW5lLWJveFwiXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChsaW5lcywgbGluZUJveCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQ0FDSEVEX0NPTlNUUlVDVEVEX0xJTkVTW2NhY2hlS2V5XSA9IGxpbmVzO1xuICB9XG5cbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIsIGxpbmVzKTtcblxuICB2YXIgaG9zaGlQb2ludHMgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImdcIiwgeyBhdHRyaWJ1dGVzOiB7IGNsYXNzOiBcImhvc2hpXCIgfSB9KTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIsIGhvc2hpUG9pbnRzKTtcblxuICBfcmVuZGVyZXIyLmRlZmF1bHQuaG9zaGlQb3NpdGlvbnNGb3IoYm9hcmRTdGF0ZS5ib2FyZFNpemUpLmZvckVhY2goZnVuY3Rpb24gKGgpIHtcbiAgICB2YXIgaG9zaGkgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGNsYXNzOiBcImhvc2hpXCIsXG4gICAgICAgIGN5OiBoLnRvcCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgY3g6IGgubGVmdCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgcjogMlxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaG9zaGlQb2ludHMsIGhvc2hpKTtcbiAgfSk7XG5cbiAgaWYgKGhhc0Nvb3JkaW5hdGVzKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb29yZGluYXRlQ29udGFpbmVyID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJnXCIsIHtcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiBcImNvb3JkaW5hdGVzXCIsXG4gICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZShcIiArIHJlbmRlcmVyLk1BUkdJTiArIFwiLCBcIiArIHJlbmRlcmVyLk1BUkdJTiArIFwiKVwiXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChfeSkge1xuICAgICAgICAvLyBUT0RPOiAxNiBpcyBmb3IgdGhlIHJlbmRlcmVkIGhlaWdodCBfb24gbXkgYnJvd3Nlcl8uIG5vdCByZWxpYWJsZS4uLlxuXG4gICAgICAgIFsxNiAvIDIgKyAxIC0gKDE2ICsgMTYgLyAyICsgMTYgLyAoMiAqIDIpICsgMTYgLyAoMiAqIDIgKiAyKSksIDE2IC8gMiArIDEgKyAoMTYgKyAxNiAvIDIpICsgKGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMSkgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSldLmZvckVhY2goZnVuY3Rpb24gKHZlcnRpY2FsT2Zmc2V0KSB7XG4gICAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29vcmRpbmF0ZUNvbnRhaW5lciwgX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJ0ZXh0XCIsIHtcbiAgICAgICAgICAgIHRleHQ6IGJvYXJkU3RhdGUueENvb3JkaW5hdGVGb3IoX3kpLFxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICBcInRleHQtYW5jaG9yXCI6IFwibWlkZGxlXCIsXG4gICAgICAgICAgICAgIHk6IHZlcnRpY2FsT2Zmc2V0IC0gMC41LFxuICAgICAgICAgICAgICB4OiBfeSAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgWy0xICogKDE2ICsgMTYgLyAyICsgMTYgLyAoMiAqIDIpKSwgMTYgKyAxNiAvIDIgKyAxNiAvICgyICogMikgKyAoYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxKSAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKV0uZm9yRWFjaChmdW5jdGlvbiAoaG9yaXpvbnRhbE9mZnNldCkge1xuICAgICAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvb3JkaW5hdGVDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwidGV4dFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBib2FyZFN0YXRlLnlDb29yZGluYXRlRm9yKF95KSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgXCJ0ZXh0LWFuY2hvclwiOiBcIm1pZGRsZVwiLFxuICAgICAgICAgICAgICB5OiBfeSAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSArIDE2IC8gKDIgKiAyKSxcbiAgICAgICAgICAgICAgeDogaG9yaXpvbnRhbE9mZnNldCAtIDAuNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoc3ZnLCBjb29yZGluYXRlQ29udGFpbmVyKTtcbiAgICAgIH07XG5cbiAgICAgIGZvciAodmFyIF95ID0gMDsgX3kgPCBib2FyZFN0YXRlLmJvYXJkU2l6ZTsgX3krKykge1xuICAgICAgICBfbG9vcChfeSk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfVxuXG4gIHZhciBpbnRlcnNlY3Rpb25zID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJnXCIsIHsgYXR0cmlidXRlczogeyBjbGFzczogXCJpbnRlcnNlY3Rpb25zXCIgfSB9KTtcblxuICBmb3IgKHZhciBfeTIgPSAwOyBfeTIgPCBib2FyZFN0YXRlLmJvYXJkU2l6ZTsgX3kyKyspIHtcbiAgICBmb3IgKHZhciBfeCA9IDA7IF94IDwgYm9hcmRTdGF0ZS5ib2FyZFNpemU7IF94KyspIHtcbiAgICAgIHZhciBpbnRlcnNlY3Rpb25Hcm91cCA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwiZ1wiLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogXCJpbnRlcnNlY3Rpb25cIlxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGludGVyc2VjdGlvbkdyb3VwLnNldEF0dHJpYnV0ZShcImRhdGEtaW50ZXJzZWN0aW9uLXlcIiwgX3kyKTtcbiAgICAgIGludGVyc2VjdGlvbkdyb3VwLnNldEF0dHJpYnV0ZShcImRhdGEtaW50ZXJzZWN0aW9uLXhcIiwgX3gpO1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9ucywgaW50ZXJzZWN0aW9uR3JvdXApO1xuXG4gICAgICB2YXIgaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImdcIiwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6IFwiaW50ZXJzZWN0aW9uLWlubmVyLWNvbnRhaW5lclwiXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9uR3JvdXAsIGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyKTtcblxuICAgICAgdmFyIGludGVyc2VjdGlvbkJveCA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwicmVjdFwiLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICB5OiBfeTIgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSByZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgLyAyIC0gMC41LFxuICAgICAgICAgIHg6IF94ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gcmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFIC8gMiAtIDAuNSxcbiAgICAgICAgICB3aWR0aDogcmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFLFxuICAgICAgICAgIGhlaWdodDogcmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIsIGludGVyc2VjdGlvbkJveCk7XG5cbiAgICAgIHZhciBzdG9uZVJhZGl1cyA9IHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSAvIDI7XG5cbiAgICAgIGlmIChzbWFsbGVyU3RvbmVzKSB7XG4gICAgICAgIHN0b25lUmFkaXVzIC09IDE7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdG9uZUF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGNsYXNzOiBcInN0b25lXCIsXG4gICAgICAgIGN5OiBfeTIgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjUsXG4gICAgICAgIGN4OiBfeCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgcjogc3RvbmVSYWRpdXNcbiAgICAgIH07XG5cbiAgICAgIGlmICghZmxhdFN0b25lcykge1xuICAgICAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lciwgX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJjaXJjbGVcIiwge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIGNsYXNzOiBcInN0b25lLXNoYWRvd1wiLFxuICAgICAgICAgICAgY3k6IHN0b25lQXR0cmlidXRlc1tcImN5XCJdICsgMixcbiAgICAgICAgICAgIGN4OiBzdG9uZUF0dHJpYnV0ZXNbXCJjeFwiXSxcbiAgICAgICAgICAgIHI6IHN0b25lUmFkaXVzXG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbnRlcnNlY3Rpb24gPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHN0b25lQXR0cmlidXRlc1xuICAgICAgfSk7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lciwgaW50ZXJzZWN0aW9uKTtcblxuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwiY2lyY2xlXCIsIHtcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiBcIm1hcmtlclwiLFxuICAgICAgICAgIGN5OiBfeTIgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjUsXG4gICAgICAgICAgY3g6IF94ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41LFxuICAgICAgICAgIHI6IDQuNVxuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyLCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInJlY3RcIiwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6IFwia28tbWFya2VyXCIsXG4gICAgICAgICAgeTogX3kyICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gNiAtIDAuNSxcbiAgICAgICAgICB4OiBfeCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDYgLSAwLjUsXG4gICAgICAgICAgd2lkdGg6IDEyLFxuICAgICAgICAgIGhlaWdodDogMTJcbiAgICAgICAgfVxuICAgICAgfSkpO1xuXG4gICAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lciwgX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJyZWN0XCIsIHtcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiBcInRlcnJpdG9yeS1tYXJrZXJcIixcbiAgICAgICAgICB5OiBfeTIgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSA2LFxuICAgICAgICAgIHg6IF94ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gNixcbiAgICAgICAgICB3aWR0aDogMTEsXG4gICAgICAgICAgaGVpZ2h0OiAxMVxuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyLCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogXCJjaXJjbGUtbGFiZWxcIixcbiAgICAgICAgICBjeTogX3kyICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41LFxuICAgICAgICAgIGN4OiBfeCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgICByOiA4XG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwicmVjdFwiLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogXCJzcXVhcmUtbGFiZWxcIixcbiAgICAgICAgICB5OiBfeTIgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSA2LFxuICAgICAgICAgIHg6IF94ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gNixcbiAgICAgICAgICB3aWR0aDogMTEsXG4gICAgICAgICAgaGVpZ2h0OiAxMVxuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIHZhciBwb3MgPSB7XG4gICAgICAgIHg6IF95MiAqIHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIF95MiAtIDAuNSxcbiAgICAgICAgeTogX3ggKiByZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyBfeCAtIDIsXG4gICAgICAgIHc6IHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSAvIDQsXG4gICAgICAgIGg6IHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSAvIDRcbiAgICAgIH07XG5cbiAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyLCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInBvbHlnb25cIiwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6IFwidHJpYW5nbGUtbGFiZWxcIixcbiAgICAgICAgICBwb2ludHM6IFN0cmluZyhwb3MueCArIFwiLFwiICsgKHBvcy55IC0gcG9zLmgpICsgXCIgXCIgKyAocG9zLnggLSBwb3MudykgKyBcIixcIiArIChwb3MueSArIHBvcy5oKSArIFwiIFwiICsgKHBvcy54ICsgcG9zLncpICsgXCIsXCIgKyAocG9zLnkgKyBwb3MuaCkpXG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgICAgdmFyIGxldHRlcnMgPSBbJ2EnLCAnYicsICdjJ107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGV0dGVycy5sZW5ndGg7ICsraSkge1xuICAgICAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lciwgX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJ0ZXh0XCIsIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBjbGFzczogbGV0dGVyc1tpXSArIFwiLWxhYmVsXCIsXG4gICAgICAgICAgICB5OiBfeTIgKiByZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyBfeTIsXG4gICAgICAgICAgICB4OiBfeCAqIHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIF94LFxuICAgICAgICAgICAgXCJ0ZXh0LWFuY2hvclwiOiBcIm1pZGRsZVwiLFxuICAgICAgICAgICAgXCJkb21pbmFudC1iYXNlbGluZVwiOiBcIm1pZGRsZVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0ZXh0OiBsZXR0ZXJzW2ldLnRvVXBwZXJDYXNlKClcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICByZW5kZXJlci5ncmlkW195Ml0gPSByZW5kZXJlci5ncmlkW195Ml0gfHwgW107XG4gICAgICByZW5kZXJlci5ncmlkW195Ml1bX3hdID0gaW50ZXJzZWN0aW9uR3JvdXA7XG5cbiAgICAgIHJlbmRlcmVyLmFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzKGludGVyc2VjdGlvbkdyb3VwLCBfeTIsIF94KTtcbiAgICB9XG4gIH1cblxuICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChjb250ZW50c0NvbnRhaW5lciwgaW50ZXJzZWN0aW9ucyk7XG5cbiAgcmV0dXJuIHN2Zztcbn07XG5cblNWR1JlbmRlcmVyLnByb3RvdHlwZS5nZW5lcmF0ZUJvYXJkID0gZnVuY3Rpb24gKGJvYXJkU3RhdGUsIF9yZWYzKSB7XG4gIHZhciBoYXNDb29yZGluYXRlcyA9IF9yZWYzLmhhc0Nvb3JkaW5hdGVzLFxuICAgICAgc21hbGxlclN0b25lcyA9IF9yZWYzLnNtYWxsZXJTdG9uZXMsXG4gICAgICBmbGF0U3RvbmVzID0gX3JlZjMuZmxhdFN0b25lcztcblxuICB0aGlzLmJsYWNrR3JhZGllbnRJRCA9IF91dGlsczIuZGVmYXVsdC5yYW5kb21JRChcImJsYWNrLWdyYWRpZW50XCIpO1xuICB0aGlzLndoaXRlR3JhZGllbnRJRCA9IF91dGlsczIuZGVmYXVsdC5yYW5kb21JRChcIndoaXRlLWdyYWRpZW50XCIpO1xuXG4gIHZhciBzdmcgPSBjb25zdHJ1Y3RTVkcodGhpcywgYm9hcmRTdGF0ZSwgeyBoYXNDb29yZGluYXRlczogaGFzQ29vcmRpbmF0ZXMsIHNtYWxsZXJTdG9uZXM6IHNtYWxsZXJTdG9uZXMsIGZsYXRTdG9uZXM6IGZsYXRTdG9uZXMgfSk7XG5cbiAgdGhpcy5zdmdFbGVtZW50ID0gc3ZnO1xuICB0aGlzLnN2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIHRoaXMuQk9BUkRfTEVOR1RIKTtcbiAgdGhpcy5zdmdFbGVtZW50LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHRoaXMuQk9BUkRfTEVOR1RIKTtcblxuICByZXR1cm4gc3ZnO1xufTtcblxuU1ZHUmVuZGVyZXIucHJvdG90eXBlLmNvbXB1dGVTaXppbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgX3JlbmRlcmVyMi5kZWZhdWx0LnByb3RvdHlwZS5jb21wdXRlU2l6aW5nLmNhbGwodGhpcyk7XG5cbiAgLy8gSW4gYWRkaXRpb24gdG8gdGhlIHdpbGwtY2hhbmdlIHJlLXJhc3RlciBpbiBSZW5kZXJlcixcbiAgLy8gdGhlIFNWRyBlbGVtZW50IGFwcGVhcnMgdG8gc29tZXRpbWVzIG5lZWQgdGhpcyB0b1xuICAvLyBwcmV2ZW50IGJsdXJyaW5lc3Mgb24gcmVzaXplLlxuICB0aGlzLnN2Z0VsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJub25lXCI7XG5cbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgX3RoaXMuc3ZnRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICB9KTtcbn07XG5cblNWR1JlbmRlcmVyLnByb3RvdHlwZS5zZXRJbnRlcnNlY3Rpb25DbGFzc2VzID0gZnVuY3Rpb24gKGludGVyc2VjdGlvbkVsLCBpbnRlcnNlY3Rpb24sIGNsYXNzZXMpIHtcbiAgaWYgKGludGVyc2VjdGlvbkVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpICE9PSBjbGFzc2VzLmpvaW4oXCIgXCIpKSB7XG4gICAgaW50ZXJzZWN0aW9uRWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gIH1cblxuICBpZiAoIXRoaXMuZmxhdFN0b25lcykge1xuICAgIGlmIChpbnRlcnNlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICBpbnRlcnNlY3Rpb25FbC5xdWVyeVNlbGVjdG9yKFwiLnN0b25lXCIpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF07XG4gICAgICBpbnRlcnNlY3Rpb25FbC5xdWVyeVNlbGVjdG9yKFwiLnN0b25lXCIpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZmlsbDogdXJsKFwiICsgYmFzZSArIFwiI1wiICsgdGhpc1tpbnRlcnNlY3Rpb24udmFsdWUgKyBcIkdyYWRpZW50SURcIl0gKyBcIilcIik7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTVkdSZW5kZXJlcjtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3ZnLXJlbmRlcmVyLmpzLm1hcCJdfQ==
},{"./renderer":10,"./utils":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  flatten: function flatten(ary) {
    return ary.reduce(function (a, b) {
      return a.concat(b);
    });
  },

  flatMap: function flatMap(ary, lambda) {
    return Array.prototype.concat.apply([], ary.map(lambda));
  },

  cartesianProduct: function cartesianProduct(ary1, ary2) {
    return this.flatten(ary1.map(function (x) {
      return ary2.map(function (y) {
        return [x, y];
      });
    }));
  },

  randomID: function randomID(prefix) {
    var str = [0, 1, 2, 3].map(function () {
      return Math.floor(Math.random() * 0x10000).toString(16).substring(1);
    }).join("");

    return prefix + "-" + str;
  },

  clone: function clone(element) {
    return element.cloneNode(true);
  },

  createElement: function createElement(elementName, options) {
    var element = document.createElement(elementName);

    if (typeof options !== "undefined") {
      if (options.class) {
        element.className = options.class;
      }
    }

    return element;
  },

  createSVGElement: function createSVGElement(elementName, options) {
    var _this = this;

    var svgNamespace = "http://www.w3.org/2000/svg";
    var element = document.createElementNS(svgNamespace, elementName);

    if (typeof options !== "undefined") {
      if (options.class) {
        options.class.split(" ").forEach(function (name) {
          _this.addClass(element, name);
        });
      }

      if (options.attributes) {
        Object.keys(options.attributes).forEach(function (k) {
          element.setAttribute(k, options.attributes[k]);
        });
      }

      if (options.text) {
        element.textContent = options.text.toString();
      }
    }

    return element;
  },

  appendElement: function appendElement(parent, el) {
    parent.insertBefore(el, null);
  },

  addEventListener: function addEventListener(el, eventName, fn) {
    el.addEventListener(eventName, fn, false);
  },

  removeClass: function removeClass(el, className) {
    if (!this.hasClass(el, className)) {
      return;
    }

    if (el.classList && el.classList.remove) {
      el.classList.remove(className);
      return;
    }

    var classNameRegex = RegExp('\\b' + className + '\\b', "g");

    if (el instanceof SVGElement) {
      el.setAttribute("class", el.getAttribute("class").replace(classNameRegex, ""));
    } else {
      el.className = el.getAttribute("class").replace(classNameRegex, "");
    }
  },

  addClass: function addClass(el, className) {
    if (el.classList && el.classList.add) {
      el.classList.add(className);
      return;
    }

    if (el instanceof SVGElement) {
      el.setAttribute("class", el.getAttribute("class") + " " + className);
    } else {
      el.className = el.getAttribute("class") + " " + className;
    }
  },

  hasClass: function hasClass(el, className) {
    if (el.classList && el.classList.contains) {
      return el.classList.contains(className);
    }

    var classNameRegex = RegExp('\\b' + className + '\\b', "g");

    if (el instanceof SVGElement) {
      return classNameRegex.test(el.getAttribute("class"));
    } else {
      return classNameRegex.test(el.className);
    }
  },

  toggleClass: function toggleClass(el, className) {
    if (el.classList && el.classList.toggle) {
      el.classList.toggle(className);
      return;
    }

    if (this.hasClass(el, className)) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
    }
  },

  unique: function unique(ary) {
    var unique = [];
    ary.forEach(function (el) {
      if (unique.indexOf(el) < 0) {
        unique.push(el);
      }
    });
    return unique;
  }
};

//# sourceMappingURL=utils.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZGVmYXVsdCIsImZsYXR0ZW4iLCJhcnkiLCJyZWR1Y2UiLCJhIiwiYiIsImNvbmNhdCIsImZsYXRNYXAiLCJsYW1iZGEiLCJBcnJheSIsInByb3RvdHlwZSIsImFwcGx5IiwibWFwIiwiY2FydGVzaWFuUHJvZHVjdCIsImFyeTEiLCJhcnkyIiwieCIsInkiLCJyYW5kb21JRCIsInByZWZpeCIsInN0ciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiam9pbiIsImNsb25lIiwiZWxlbWVudCIsImNsb25lTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJlbGVtZW50TmFtZSIsIm9wdGlvbnMiLCJkb2N1bWVudCIsImNsYXNzIiwiY2xhc3NOYW1lIiwiY3JlYXRlU1ZHRWxlbWVudCIsIl90aGlzIiwic3ZnTmFtZXNwYWNlIiwiY3JlYXRlRWxlbWVudE5TIiwic3BsaXQiLCJmb3JFYWNoIiwibmFtZSIsImFkZENsYXNzIiwiYXR0cmlidXRlcyIsImtleXMiLCJrIiwic2V0QXR0cmlidXRlIiwidGV4dCIsInRleHRDb250ZW50IiwiYXBwZW5kRWxlbWVudCIsInBhcmVudCIsImVsIiwiaW5zZXJ0QmVmb3JlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImZuIiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImNsYXNzTmFtZVJlZ2V4IiwiUmVnRXhwIiwiU1ZHRWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInJlcGxhY2UiLCJhZGQiLCJjb250YWlucyIsInRlc3QiLCJ0b2dnbGVDbGFzcyIsInRvZ2dsZSIsInVuaXF1ZSIsImluZGV4T2YiLCJwdXNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFB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R0ExSGU7O0FBNEhoQmtDLGVBQWEsU0FBU0EsV0FBVCxDQUFxQmpCLEVBQXJCLEVBQXlCakIsU0FBekIsRUFBb0M7QUFDL0MsUUFBSWlCLEdBQUdPLFNBQUgsSUFBZ0JQLEdBQUdPLFNBQUgsQ0FBYVcsTUFBakMsRUFBeUM7QUFDdkNsQixTQUFHTyxTQUFILENBQWFXLE1BQWIsQ0FBb0JuQyxTQUFwQjtBQUNBO0FBQ0Q7O0FBRUQsUUFBSSxLQUFLdUIsUUFBTCxDQUFjTixFQUFkLEVBQWtCakIsU0FBbEIsQ0FBSixFQUFrQztBQUNoQyxXQUFLc0IsV0FBTCxDQUFpQkwsRUFBakIsRUFBcUJqQixTQUFyQjtBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtRLFFBQUwsQ0FBY1MsRUFBZCxFQUFrQmpCLFNBQWxCO0FBQ0Q7QUFDRixHQXZJZTs7QUF5SWhCb0MsVUFBUSxTQUFTQSxNQUFULENBQWdCckUsR0FBaEIsRUFBcUI7QUFDM0IsUUFBSXFFLFNBQVMsRUFBYjtBQUNBckUsUUFBSXVDLE9BQUosQ0FBWSxVQUFVVyxFQUFWLEVBQWM7QUFDeEIsVUFBSW1CLE9BQU9DLE9BQVAsQ0FBZXBCLEVBQWYsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUJtQixlQUFPRSxJQUFQLENBQVlyQixFQUFaO0FBQ0Q7QUFDRixLQUpEO0FBS0EsV0FBT21CLE1BQVA7QUFDRDtBQWpKZSxDQUFsQjs7QUFvSkEiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZmxhdHRlbjogZnVuY3Rpb24gZmxhdHRlbihhcnkpIHtcbiAgICByZXR1cm4gYXJ5LnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICAgIH0pO1xuICB9LFxuXG4gIGZsYXRNYXA6IGZ1bmN0aW9uIGZsYXRNYXAoYXJ5LCBsYW1iZGEpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgYXJ5Lm1hcChsYW1iZGEpKTtcbiAgfSxcblxuICBjYXJ0ZXNpYW5Qcm9kdWN0OiBmdW5jdGlvbiBjYXJ0ZXNpYW5Qcm9kdWN0KGFyeTEsIGFyeTIpIHtcbiAgICByZXR1cm4gdGhpcy5mbGF0dGVuKGFyeTEubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gYXJ5Mi5tYXAoZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSxcblxuICByYW5kb21JRDogZnVuY3Rpb24gcmFuZG9tSUQocHJlZml4KSB7XG4gICAgdmFyIHN0ciA9IFswLCAxLCAyLCAzXS5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG4gICAgfSkuam9pbihcIlwiKTtcblxuICAgIHJldHVybiBwcmVmaXggKyBcIi1cIiArIHN0cjtcbiAgfSxcblxuICBjbG9uZTogZnVuY3Rpb24gY2xvbmUoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfSxcblxuICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lKTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3MpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIGNyZWF0ZVNWR0VsZW1lbnQ6IGZ1bmN0aW9uIGNyZWF0ZVNWR0VsZW1lbnQoZWxlbWVudE5hbWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHN2Z05hbWVzcGFjZSA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmdOYW1lc3BhY2UsIGVsZW1lbnROYW1lKTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3MpIHtcbiAgICAgICAgb3B0aW9ucy5jbGFzcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIF90aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuYXR0cmlidXRlcykge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLmF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrLCBvcHRpb25zLmF0dHJpYnV0ZXNba10pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMudGV4dCkge1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gb3B0aW9ucy50ZXh0LnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgYXBwZW5kRWxlbWVudDogZnVuY3Rpb24gYXBwZW5kRWxlbWVudChwYXJlbnQsIGVsKSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShlbCwgbnVsbCk7XG4gIH0sXG5cbiAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihlbCwgZXZlbnROYW1lLCBmbikge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmbiwgZmFsc2UpO1xuICB9LFxuXG4gIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKCF0aGlzLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVsLmNsYXNzTGlzdCAmJiBlbC5jbGFzc0xpc3QucmVtb3ZlKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzTmFtZVJlZ2V4ID0gUmVnRXhwKCdcXFxcYicgKyBjbGFzc05hbWUgKyAnXFxcXGInLCBcImdcIik7XG5cbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5yZXBsYWNlKGNsYXNzTmFtZVJlZ2V4LCBcIlwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLnJlcGxhY2UoY2xhc3NOYW1lUmVnZXgsIFwiXCIpO1xuICAgIH1cbiAgfSxcblxuICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmFkZCkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlbCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpICsgXCIgXCIgKyBjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSArIFwiIFwiICsgY2xhc3NOYW1lO1xuICAgIH1cbiAgfSxcblxuICBoYXNDbGFzczogZnVuY3Rpb24gaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKSB7XG4gICAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzTmFtZVJlZ2V4ID0gUmVnRXhwKCdcXFxcYicgKyBjbGFzc05hbWUgKyAnXFxcXGInLCBcImdcIik7XG5cbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICByZXR1cm4gY2xhc3NOYW1lUmVnZXgudGVzdChlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjbGFzc05hbWVSZWdleC50ZXN0KGVsLmNsYXNzTmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbCwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdCAmJiBlbC5jbGFzc0xpc3QudG9nZ2xlKSB7XG4gICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIHVuaXF1ZTogZnVuY3Rpb24gdW5pcXVlKGFyeSkge1xuICAgIHZhciB1bmlxdWUgPSBbXTtcbiAgICBhcnkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGlmICh1bmlxdWUuaW5kZXhPZihlbCkgPCAwKSB7XG4gICAgICAgIHVuaXF1ZS5wdXNoKGVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdW5pcXVlO1xuICB9XG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiXX0=
},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cache = {};

function initialBitstringFor(size, y, x, value) {
  cache[size] = cache[size] || {};
  cache[size][y] = cache[size][y] || {};
  cache[size][y][x] = cache[size][y][x] || {};

  if (cache[size][y][x][value]) {
    return cache[size][y][x][value];
  }

  // The number of legal 19x19 go moves is on the order of 10^170 ≈ 2^565, so
  // a hash output on the order of 2^31 is woefully insufficient for arbitrary
  // positions, but it should be good enough for human play, since we're not
  // searching the entire space. This should be good enough for ~300-move games.
  var randomValue = Math.floor(Math.random() * (Math.pow(2, 31) - 1));
  cache[size][y][x][value] = randomValue;

  return randomValue;
}

exports.default = {
  hash: function hash(boardSize, intersections) {
    var h = 0;

    intersections.forEach(function (i) {
      if (!i.isEmpty()) {
        var initial = initialBitstringFor(boardSize, i.y, i.x, i.value);
        h = h ^ initial;
      }
    });

    return h;
  }
};

//# sourceMappingURL=zobrist.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvYnJpc3QuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJjYWNoZSIsImluaXRpYWxCaXRzdHJpbmdGb3IiLCJzaXplIiwieSIsIngiLCJyYW5kb21WYWx1ZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInBvdyIsImRlZmF1bHQiLCJoYXNoIiwiYm9hcmRTaXplIiwiaW50ZXJzZWN0aW9ucyIsImgiLCJmb3JFYWNoIiwiaSIsImlzRW1wdHkiLCJpbml0aWFsIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJQyxRQUFRLEVBQVo7O0FBRUEsU0FBU0MsbUJBQVQsQ0FBNkJDLElBQTdCLEVBQW1DQyxDQUFuQyxFQUFzQ0MsQ0FBdEMsRUFBeUNMLEtBQXpDLEVBQWdEO0FBQzlDQyxRQUFNRSxJQUFOLElBQWNGLE1BQU1FLElBQU4sS0FBZSxFQUE3QjtBQUNBRixRQUFNRSxJQUFOLEVBQVlDLENBQVosSUFBaUJILE1BQU1FLElBQU4sRUFBWUMsQ0FBWixLQUFrQixFQUFuQztBQUNBSCxRQUFNRSxJQUFOLEVBQVlDLENBQVosRUFBZUMsQ0FBZixJQUFvQkosTUFBTUUsSUFBTixFQUFZQyxDQUFaLEVBQWVDLENBQWYsS0FBcUIsRUFBekM7O0FBRUEsTUFBSUosTUFBTUUsSUFBTixFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JMLEtBQWxCLENBQUosRUFBOEI7QUFDNUIsV0FBT0MsTUFBTUUsSUFBTixFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JMLEtBQWxCLENBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUlNLGNBQWNDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxNQUFpQkYsS0FBS0csR0FBTCxDQUFTLENBQVQsRUFBWSxFQUFaLElBQWtCLENBQW5DLENBQVgsQ0FBbEI7QUFDQVQsUUFBTUUsSUFBTixFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JMLEtBQWxCLElBQTJCTSxXQUEzQjs7QUFFQSxTQUFPQSxXQUFQO0FBQ0Q7O0FBRURQLFFBQVFZLE9BQVIsR0FBa0I7QUFDaEJDLFFBQU0sU0FBU0EsSUFBVCxDQUFjQyxTQUFkLEVBQXlCQyxhQUF6QixFQUF3QztBQUM1QyxRQUFJQyxJQUFJLENBQVI7O0FBRUFELGtCQUFjRSxPQUFkLENBQXNCLFVBQVVDLENBQVYsRUFBYTtBQUNqQyxVQUFJLENBQUNBLEVBQUVDLE9BQUYsRUFBTCxFQUFrQjtBQUNoQixZQUFJQyxVQUFVakIsb0JBQW9CVyxTQUFwQixFQUErQkksRUFBRWIsQ0FBakMsRUFBb0NhLEVBQUVaLENBQXRDLEVBQXlDWSxFQUFFakIsS0FBM0MsQ0FBZDtBQUNBZSxZQUFJQSxJQUFJSSxPQUFSO0FBQ0Q7QUFDRixLQUxEOztBQU9BLFdBQU9KLENBQVA7QUFDRDtBQVplLENBQWxCOztBQWVBIiwiZmlsZSI6InpvYnJpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBjYWNoZSA9IHt9O1xuXG5mdW5jdGlvbiBpbml0aWFsQml0c3RyaW5nRm9yKHNpemUsIHksIHgsIHZhbHVlKSB7XG4gIGNhY2hlW3NpemVdID0gY2FjaGVbc2l6ZV0gfHwge307XG4gIGNhY2hlW3NpemVdW3ldID0gY2FjaGVbc2l6ZV1beV0gfHwge307XG4gIGNhY2hlW3NpemVdW3ldW3hdID0gY2FjaGVbc2l6ZV1beV1beF0gfHwge307XG5cbiAgaWYgKGNhY2hlW3NpemVdW3ldW3hdW3ZhbHVlXSkge1xuICAgIHJldHVybiBjYWNoZVtzaXplXVt5XVt4XVt2YWx1ZV07XG4gIH1cblxuICAvLyBUaGUgbnVtYmVyIG9mIGxlZ2FsIDE5eDE5IGdvIG1vdmVzIGlzIG9uIHRoZSBvcmRlciBvZiAxMF4xNzAg4omIIDJeNTY1LCBzb1xuICAvLyBhIGhhc2ggb3V0cHV0IG9uIHRoZSBvcmRlciBvZiAyXjMxIGlzIHdvZWZ1bGx5IGluc3VmZmljaWVudCBmb3IgYXJiaXRyYXJ5XG4gIC8vIHBvc2l0aW9ucywgYnV0IGl0IHNob3VsZCBiZSBnb29kIGVub3VnaCBmb3IgaHVtYW4gcGxheSwgc2luY2Ugd2UncmUgbm90XG4gIC8vIHNlYXJjaGluZyB0aGUgZW50aXJlIHNwYWNlLiBUaGlzIHNob3VsZCBiZSBnb29kIGVub3VnaCBmb3IgfjMwMC1tb3ZlIGdhbWVzLlxuICB2YXIgcmFuZG9tVmFsdWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoTWF0aC5wb3coMiwgMzEpIC0gMSkpO1xuICBjYWNoZVtzaXplXVt5XVt4XVt2YWx1ZV0gPSByYW5kb21WYWx1ZTtcblxuICByZXR1cm4gcmFuZG9tVmFsdWU7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgaGFzaDogZnVuY3Rpb24gaGFzaChib2FyZFNpemUsIGludGVyc2VjdGlvbnMpIHtcbiAgICB2YXIgaCA9IDA7XG5cbiAgICBpbnRlcnNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgIGlmICghaS5pc0VtcHR5KCkpIHtcbiAgICAgICAgdmFyIGluaXRpYWwgPSBpbml0aWFsQml0c3RyaW5nRm9yKGJvYXJkU2l6ZSwgaS55LCBpLngsIGkudmFsdWUpO1xuICAgICAgICBoID0gaCBeIGluaXRpYWw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaDtcbiAgfVxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9em9icmlzdC5qcy5tYXAiXX0=
},{}]},{},[1])(1)
});
