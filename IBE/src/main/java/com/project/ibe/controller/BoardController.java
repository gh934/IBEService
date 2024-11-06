package com.project.ibe.controller;

import com.project.ibe.dto.board.BoardCommentRequest;
import com.project.ibe.dto.board.BoardFormRequest;
import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;


    @PostMapping
    public Response saveBoard(@RequestBody BoardFormRequest boardFormRequest, @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, boardService.saveBoard(boardFormRequest, principalDTO), "200");
        }catch (Exception e){
            return  new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @GetMapping("/{id}")
    public Response getBoardDetail(@PathVariable("id")Long boardId){
        try{
            return new Response(ResponseCode.SUCCESS, boardService.getBoardDetail(boardId), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }


    /**
     * 댓글 등록.
     */
    @PostMapping("/comments")
    public Response saveBoardComments(@RequestBody BoardCommentRequest boardCommentRequest,
                                      @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, null, "200");
        } catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }

    }
}
