package kr.or.iei.board.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.board.model.service.BoardService;
import kr.or.iei.board.model.vo.Board;

@RestController
@RequestMapping(value = "/board")
public class BoardController {
	@Autowired
	private BoardService boardService;

	@GetMapping(value = "/list{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = boardService.boardList(reqPage);
		return map;
	}
	@PostMapping(value = "/insert")
	public int insertBoard(@ModelAttribute Board b,
							@ModelAttribute MultipartFile thumbnail,
							@ModelAttribute MultipartFile[] boardFile,
							@RequestAttribute String memberId) {
		System.out.println(b);
		System.out.println(memberId);
		System.out.println(thumbnail.getOriginalFilename());
		for(int i=0;i<boardFile.length;i++) {
			System.out.println(boardFile[i].getOriginalFilename());
		}
		return 0;
	}
}
