import { BlackPieces, chessBoard, WhitePieces } from "./chess-board";
import { Pieces } from "./Pieces";
import { PossibleMoves } from "./possible-moves";

export module SelectedPiece {
  export let previousPosition: number[];
  export let possibleMoves: number[][];
  export let piece: Pieces;
  export let isWhite: boolean;

  export function calculatePossibleMoves(
    isWhiteTurn: boolean,
    row: number,
    column: number
  ) {
    let currentPiece = chessBoard[row][column];
    if (isWhiteTurn) {
      switch (currentPiece) {
        case Pieces.WhitePawn:
          possibleMoves = PossibleMoves.getWhitePawnMoves(row, column);
          break;
        case Pieces.WhiteKnight:
          possibleMoves = PossibleMoves.getKnightMoves(
            row,
            column,
            WhitePieces
          );
          break;
        case Pieces.WhiteBishop:
          possibleMoves = PossibleMoves.getBishopMoves(
            row,
            column,
            WhitePieces
          );
          break;
        case Pieces.WhiteRook:
          possibleMoves = PossibleMoves.getRookMoves(row, column, WhitePieces);
          break;
        case Pieces.WhiteQueen:
          possibleMoves = PossibleMoves.getBishopMoves(
            row,
            column,
            WhitePieces
          ).concat(PossibleMoves.getRookMoves(row, column, WhitePieces));
          break;
        case Pieces.WhiteKing:
          possibleMoves = PossibleMoves.getKingMoves(row, column, WhitePieces);
          break;
      }
    } else {
      switch (currentPiece) {
        case Pieces.BlackPawn:
          possibleMoves = PossibleMoves.getBlackPawnMoves(row, column);
          break;
        case Pieces.BlackKnight:
          possibleMoves = PossibleMoves.getKnightMoves(
            row,
            column,
            BlackPieces
          );
          break;
        case Pieces.BlackBishop:
          possibleMoves = PossibleMoves.getBishopMoves(
            row,
            column,
            BlackPieces
          );
          break;
        case Pieces.BlackRook:
          possibleMoves = PossibleMoves.getRookMoves(row, column, BlackPieces);
          break;
        case Pieces.BlackQueen:
          possibleMoves = PossibleMoves.getBishopMoves(
            row,
            column,
            BlackPieces
          ).concat(PossibleMoves.getRookMoves(row, column, BlackPieces));
          break;
        case Pieces.BlackKing:
          possibleMoves = PossibleMoves.getKingMoves(row, column, BlackPieces);
          break;
      }
    }
  }
}
