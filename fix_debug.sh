#!/bin/bash

FILE="app/modules/[moduleId]/sessions/[sessionId]/page.tsx"

# Add debug code after the h4 heading for written curriculum
sed -i '/📝 Core Teaching Content/,/<\/h4>/ {
  /<\/h4>/ a\
          {/* TEMPORARY DEBUG */}\
          <div className="bg-yellow-100 border border-yellow-400 p-4 rounded mb-4">\
            <h5 className="font-bold text-yellow-800">🐛 DEBUG INFO:</h5>\
            <div className="text-sm space-y-1">\
              <p><strong>sessionData exists:</strong> {sessionData ? "YES" : "NO"}</p>\
              <p><strong>content exists:</strong> {sessionData?.content ? "YES" : "NO"}</p>\
              <p><strong>written_curriculum exists:</strong> {sessionData?.content?.written_curriculum ? "YES" : "NO"}</p>\
              <p><strong>main_content exists:</strong> {sessionData?.content?.written_curriculum?.main_content ? "YES" : "NO"}</p>\
              <p><strong>main_content length:</strong> {sessionData?.content?.written_curriculum?.main_content?.length || "undefined"}</p>\
            </div>\
          </div>
}' "$FILE"

echo "Debug code added to $FILE"
