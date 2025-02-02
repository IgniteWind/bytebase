package common

import "testing"

func TestHasPrefixes(t *testing.T) {
	type args struct {
		src      string
		prefixes []string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{
			name: "has prefixes",
			args: args{
				src:      "abc",
				prefixes: []string{"a", "b", "c"},
			},
			want: true,
		},
		{
			name: "has no matching prefix",
			args: args{
				src:      "this is a sentence",
				prefixes: []string{"that", "x", "y"},
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := HasPrefixes(tt.args.src, tt.args.prefixes...); got != tt.want {
				t.Fatalf("HasPrefixes() = %v, want %v", got, tt.want)
			}
		})
	}
}
