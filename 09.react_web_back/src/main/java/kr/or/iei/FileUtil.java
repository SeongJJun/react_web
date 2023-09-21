package kr.or.iei;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUtil {
	public String getFilepath(String savepath, String filename, MultipartFile uploadFile) {
		//filename => test.txt
		// 			test | .txt  로 나눌것
		//.substring(첫번째 매개변수, 두번째 매개변수) => 첫번째수(포함)~두번째수(미포함)
		// lastIndexOf => 마지막에서부터 처음으로 (괄화 안에는 찾을 문자)를 찾아가는 코드
		String onlyFilename = filename.substring(0, filename.lastIndexOf("."));// test
		String extention = filename.substring(filename.lastIndexOf("."));// .txt
		//실제 업로드 할 파일명을 저장할 변수
		String filepath = null;
		//파일명 중복되면 뒤에 붙일 숫자
		int count = 0;
		while(true) {
			if(count == 0) {
				//filepath = test(onlyFilename) + .txt(extention)
				filepath = onlyFilename+extention;// = filename
			}else {
				//filepath = test(onlyFilename) + "_" + count + .txt(extention)
				filepath = onlyFilename+"_"+count+extention;// = text_1.txt (첫번째 바퀴 기준)
			}
			// checkFile = C:/Temp/upload/notice/(savepath) + filepath(filepath)
			File checkFile = new File(savepath+filepath);
			//동일한 파일명이 존재하지 않으면 while문 나가기.
			if(!checkFile.exists()) {
				try {
					uploadFile.transferTo(checkFile);
				} catch (IllegalStateException | IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}
			count++;
		}
		return filepath;
	}

}
