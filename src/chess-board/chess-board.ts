import { Pieces } from './Pieces';

export const BlackPieces: Pieces[] = [
	Pieces.BlackRookA,
	Pieces.BlackRookH,
	Pieces.BlackKnight,
	Pieces.BlackBishop,
	Pieces.BlackQueen,
	Pieces.BlackKing,
	Pieces.BlackPawn,
];

export const WhitePieces: Pieces[] = [
	Pieces.WhiteRookA,
	Pieces.WhiteRookH,
	Pieces.WhiteKnight,
	Pieces.WhiteBishop,
	Pieces.WhiteQueen,
	Pieces.WhiteKing,
	Pieces.WhitePawn,
];

export const chessBoard: Pieces[][] = [
	[
		Pieces.BlackRookA,
		Pieces.BlackKnight,
		Pieces.BlackBishop,
		Pieces.BlackQueen,
		Pieces.BlackKing,
		Pieces.BlackBishop,
		Pieces.BlackKnight,
		Pieces.BlackRookH,
	],
	[
		Pieces.BlackPawn,
		Pieces.BlackPawn,
		Pieces.BlackPawn,
		Pieces.BlackPawn,
		Pieces.BlackPawn,
		Pieces.BlackPawn,
		Pieces.BlackPawn,
		Pieces.BlackPawn,
	],
	[
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
	],
	[
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
	],
	[
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
	],
	[
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
		Pieces.Empty,
	],
	[
		Pieces.WhitePawn,
		Pieces.WhitePawn,
		Pieces.WhitePawn,
		Pieces.WhitePawn,
		Pieces.WhitePawn,
		Pieces.WhitePawn,
		Pieces.WhitePawn,
		Pieces.WhitePawn,
	],
	[
		Pieces.WhiteRookA,
		Pieces.WhiteKnight,
		Pieces.WhiteBishop,
		Pieces.WhiteQueen,
		Pieces.WhiteKing,
		Pieces.WhiteBishop,
		Pieces.WhiteKnight,
		Pieces.WhiteRookH,
	],
];
