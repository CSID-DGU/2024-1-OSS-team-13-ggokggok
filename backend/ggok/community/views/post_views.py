from coreapi.auth import TokenAuthentication
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from community.models import Post
from community.serializers import CommunityPostSerializer
from rest_framework.permissions import IsAuthenticated

def extract_region(full_region):
    # 문자열을 공백 기준으로 분할합니다. 최대 2개의 띄어쓰기만 고려하여 분할
    word = full_region.split(' ', 2)
    # 띄어쓰기로 분할된 부분 중 첫 2개만 합침
    # 띄어쓰기가 2번 이하인 경우에는 전체 문자열이나, 해당하는 부분만 반환
    extracted_region = ' '.join(word[:2])
    return extracted_region
class PostListAndCreate(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommunityPostSerializer
    queryset = Post.objects.all()
    #authentication_classes = [TokenAuthentication]
    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = CommunityPostSerializer(posts, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=CommunityPostSerializer)
    def post(self, request, *args, **kwargs):
        serializer = CommunityPostSerializer(data=request.data)

        if serializer.is_valid():
            requested_region = request.data.get('post_region', '')
            requested_region = extract_region(requested_region)

            # 현재 사용자의 region1과 region2 값을 얻습니다.
            user_region1 = extract_region(request.user.region1)
            user_region2 = extract_region(request.user.region2)
            # 요청된 region 값이 사용자의 region1 또는 region2와 일치하는지 확인합니다.
            #if requested_region in [user_region1, user_region2]:
            if requested_region == user_region1 or requested_region == user_region2:
                serializer.save(author=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': '사용자가 등록한 지역의 게시글만 작성 가능합니다'},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetailUpdateDelete(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommunityPostSerializer
    queryset = Post.objects.all()
    def get_object(self, post_id):
        return get_object_or_404(Post, pk=post_id)

    def get(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        serializer = CommunityPostSerializer(post)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=CommunityPostSerializer)
    def put(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        serializer = CommunityPostSerializer(post, data=request.data)
        if serializer.is_valid():
            if request.user == post.author:
                serializer.save()
                return Response(serializer.data)
            else:
                return Response({'error': '사용자가 작성한 글이 아닙니다.'}, status=400)

    def delete(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        if request.user == post.author:
            post.delete()
        else:
            return Response({'error': '사용자가 작성한 글이 아닙니다.'}, status=400)
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostVote(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommunityPostSerializer
    queryset = Post.objects.all()
    @swagger_auto_schema(responses={200: CommunityPostSerializer})
    def post(self, request, post_id, *args, **kwargs):
        post = get_object_or_404(Post, pk=post_id)
        if request.user == post.author:
            return Response({'error': '본인이 작성한 글은 추천할 수 없습니다.'}, status=400)
        else:
            post.voter.add(request.user)
            post.save()  # 변경 사항 저장
            serializer = CommunityPostSerializer(post)
            return Response(serializer.data)