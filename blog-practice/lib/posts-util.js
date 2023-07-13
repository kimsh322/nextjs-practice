// gray-matter 패키지가 마크다운다 메타데이터를 구분한다.
import matter from "gray-matter";
import fs from "fs";
import path from "path";
// process.cwd()는 작업디렉토리의 루트를 가리킨다.
const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

// 각각의 post 파일 읽는 함수
export function getPostData(postIdentifier) {
  // 파일이름 제일뒤의 확장자 제거
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  // matter는 2개의 프로퍼티를 가지는 객체 반환
  // data는 메타데이터, content는 마크다운 반환
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

// 모든 posts 받는 함수
export function getAllPosts() {
  // 디렉토리의 전체 파일을 동기적으로 읽는 메서드, 배열 반환
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
