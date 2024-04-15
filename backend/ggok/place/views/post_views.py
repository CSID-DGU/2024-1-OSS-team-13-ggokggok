from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..forms import PlacePostForm
from ..models import PlacePost
from ...placesinfo.models import PlaceInfo
from ..api import PlacePostSerializer
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone

@login_required(login_url='account:login')
@api_view(['POST'])
def post_create(request):
    if request.method == 'POST':

        #명소 위도+경도 받아와서 확인
        place_lat = request.data.get('lat')
        place_long = request.data.get('long')
        isPlace = PlaceInfo.objects.filter(lat=place_lat, long=place_long)

        if isPlace:
            place_id = isPlace.id
        else: #없으면 새로 등록
            place_name = request.data.get('name')
            place_address = request.data.get('address')
            newPlace = PlaceInfo.objects.create(name=place_name, address=place_address, lat=place_lat, long=place_long)
            place_id = newPlace.id

        form = PlacePostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.date = timezone.now()
            post.place_id = place_id
            post.save()
            #signal
            serializer = PlacePostSerializer(post)
            return Response(serializer.data)
        return Response(form.errors, status=400)

@login_required(login_url='account:login')
@api_view(['PUT'])
def post_modify(request, post_id):
    post = get_object_or_404(PlacePost, pk=post_id)
    if request.user != post.author:
        return Response({'error': '수정권한이 없습니다'}, status=403)
    if request.method == 'PUT':
        form = PlacePostForm(request.data, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.date = timezone.now()
            post.save()
            serializer = PlacePostSerializer(post)
            return Response(serializer.data)
        return Response(form.errors, status=400)

@login_required(login_url='account:login')
@api_view(['DELETE'])
def post_delete(request, post_id):
    post = get_object_or_404(PlacePost, pk=post_id)
    if request.user != post.author:
        return Response({'error': '삭제권한이 없습니다'}, status=403)
    post.delete()
    return Response(status=204)

@login_required(login_url='account:login')
@api_view(['POST'])
def post_vote(request, post_id):
    post = get_object_or_404(PlacePost, pk=post_id)
    if request.user == post.author:
        return Response({'error': '본인이 작성한 글은 추천할수 없습니다'}, status=400)
    else:
        post.review.add(request.user)
        serializer = PlacePostSerializer(post)
        return Response(serializer.data)
