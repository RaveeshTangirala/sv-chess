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
      possibleMoves = getWhitePieceMoves(currentPiece, row, column);
    } else {
      possibleMoves = getBlackPieceMoves(currentPiece, row, column);
    }
  }

  function getWhitePieceMoves(
    currentPiece: Pieces,
    row: number,
    column: number
  ): number[][] {
    switch (currentPiece) {
      case Pieces.WhitePawn:
        return PossibleMoves.getWhitePawnMoves(row, column);
      case Pieces.WhiteKnight:
        return PossibleMoves.getKnightMoves(row, column, WhitePieces);
      case Pieces.WhiteBishop:
        return PossibleMoves.getBishopMoves(row, column, WhitePieces);
      case Pieces.WhiteRook:
        return PossibleMoves.getRookMoves(row, column, WhitePieces);
      case Pieces.WhiteQueen:
        return PossibleMoves.getBishopMoves(row, column, WhitePieces).concat(
          PossibleMoves.getRookMoves(row, column, WhitePieces)
        );
      case Pieces.WhiteKing:
        return PossibleMoves.getKingMoves(row, column, WhitePieces);
    }
  }

  function getBlackPieceMoves(
    currentPiece: Pieces,
    row: number,
    column: number
  ): number[][] {
    switch (currentPiece) {
      case Pieces.BlackPawn:
        return PossibleMoves.getBlackPawnMoves(row, column);
      case Pieces.BlackKnight:
        return PossibleMoves.getKnightMoves(row, column, BlackPieces);
      case Pieces.BlackBishop:
        return PossibleMoves.getBishopMoves(row, column, BlackPieces);
      case Pieces.BlackRook:
        return PossibleMoves.getRookMoves(row, column, BlackPieces);
      case Pieces.BlackQueen:
        return PossibleMoves.getBishopMoves(row, column, BlackPieces).concat(
          PossibleMoves.getRookMoves(row, column, BlackPieces)
        );
      case Pieces.BlackKing:
        return PossibleMoves.getKingMoves(row, column, BlackPieces);
    }
  }
}
