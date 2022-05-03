import { BlackPieces, chessBoard, WhitePieces } from './chess-board';
import { Pieces } from './Pieces';
import { Castling, PossibleMoves } from './possible-moves';

export module SelectedPiece {
	let isWhite: boolean = true;
	let previousPosition: number[];
	let piece: Pieces;

	export function updatePreviousPosition(row: number, column: number): void {
		previousPosition = [row, column];
	}

	export function updateCurrentPiece(newPiece: Pieces): void {
		piece = newPiece;
	}

	export function getPossibleMoves(row: number, column: number): number[][] {
		const currentPiece = chessBoard[row][column];
		if (isWhite) {
			return getWhitePieceMoves(currentPiece, row, column);
		}
		return getBlackPieceMoves(currentPiece, row, column);
	}

	export function move(row: number, column: number): void {
		chessBoard[row][column] = piece;
		chessBoard[previousPosition[0]][previousPosition[1]] = Pieces.Empty;

		if (
			Castling.isWhiteLongCastleAllowed ||
			Castling.isWhiteShortCastleAllowed ||
			Castling.isBlackLongCastleAllowed ||
			Castling.isBlackShortCastleAllowed
		) {
			switch (piece) {
				case Pieces.WhiteRookA:
					Castling.isWhiteLongCastleAllowed = false;
					break;
				case Pieces.WhiteRookH:
					Castling.isWhiteShortCastleAllowed = false;
					break;
				case Pieces.BlackRookA:
					Castling.isBlackLongCastleAllowed = false;
					break;
				case Pieces.BlackRookH:
					Castling.isBlackShortCastleAllowed = false;
					break;
				case Pieces.WhiteKing:
					castle(isWhite, row, column);
					Castling.isWhiteShortCastleAllowed = false;
					Castling.isWhiteLongCastleAllowed = false;
					break;
				case Pieces.BlackKing:
					castle(isWhite, row, column);
					Castling.isBlackShortCastleAllowed = false;
					Castling.isBlackLongCastleAllowed = false;
					break;
			}
		}

		isWhite = !isWhite;
	}
}

function castle(isWhiteTurn: boolean, row: number, column: number) {
	if (isWhiteTurn) {
		// short castle
		if (Castling.isWhiteShortCastleAllowed && column === 6) {
			chessBoard[row][7] = Pieces.Empty;
			chessBoard[row][column - 1] = Pieces.WhiteRookH;
		}
		// long castle
		else if (Castling.isWhiteShortCastleAllowed && column === 2) {
			chessBoard[row][0] = Pieces.Empty;
			chessBoard[row][column + 1] = Pieces.WhiteRookA;
		}
	} else {
		// short castle
		if (Castling.isBlackShortCastleAllowed && column === 6) {
			chessBoard[row][7] = Pieces.Empty;
			chessBoard[row][column - 1] = Pieces.BlackRookH;
		}
		// long castle
		else if (Castling.isBlackLongCastleAllowed && column === 2) {
			chessBoard[row][0] = Pieces.Empty;
			chessBoard[row][column + 1] = Pieces.BlackRookA;
		}
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
		case Pieces.WhiteRookA:
		case Pieces.WhiteRookH:
			return PossibleMoves.getRookMoves(row, column, WhitePieces);
		case Pieces.WhiteQueen:
			return PossibleMoves.getBishopMoves(row, column, WhitePieces).concat(
				PossibleMoves.getRookMoves(row, column, WhitePieces)
			);
		case Pieces.WhiteKing:
			return PossibleMoves.getKingMoves(row, column, WhitePieces, true);
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
		case Pieces.BlackRookA:
		case Pieces.BlackRookH:
			return PossibleMoves.getRookMoves(row, column, BlackPieces);
		case Pieces.BlackQueen:
			return PossibleMoves.getBishopMoves(row, column, BlackPieces).concat(
				PossibleMoves.getRookMoves(row, column, BlackPieces)
			);
		case Pieces.BlackKing:
			return PossibleMoves.getKingMoves(row, column, BlackPieces, false);
	}
}
